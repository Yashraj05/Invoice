import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user';
import * as bcrypt from 'bcrypt';
import { generateRandomOTP } from './utils/generateOtp';
import * as nodemailer from 'nodemailer';
import { OTP } from './schemas/otp';
import { OTPDocument } from './dto/otp.dto';
import { ForgetPasswordDto } from './dto/forgetpassword.dto';
@Injectable()
export class AuthService {
  private transporter: nodemailer.Transporter;
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel('OTP') private otpModel: Model<OTP>,
    private jwtService: JwtService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: process.env.OAUTH_ACCESS_TOKEN, // Optional: You can also include the access token if you have it
      },
    });
  }
  async login(loginDto: LoginDto): Promise<{ token: string; user: User }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    console.log(user);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    console.log(password);
    console.log(user.password);
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    console.log(isPasswordMatched);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.jwtService.sign({ id: user._id });

    return { user, token };
  }
  async generateOtp(forgetPassword: ForgetPasswordDto) {
    const { email } = forgetPassword;
    const user = await this.userModel.findOne({ email });
    console.log(user);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    //generating an otp
    const generatedOTP = generateRandomOTP();

    // Step 2: Send OTP to the user's email
    try {
      await this.sendOTPByEmail(email, generatedOTP);
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw new Error('Error sending OTP');
    }

    // Step 3: Save OTP in the database
    const otpDocument = new this.otpModel({
      otp: generatedOTP,
      userEmail: email,
    });

    await otpDocument.save();

    return 'OTP sent successfully';
  }
  async verifyOTP(email: string, otp: string) {
    // Step 1: Find the OTP document associated with the user's email
    const otpDocument = (await this.otpModel
      .findOne({ userEmail: email })
      .sort({ createdAt: -1 })
      .lean()
      .exec()) as unknown as OTPDocument | null;

    if (!otpDocument) {
      throw new UnauthorizedException('OTP not found');
    }

    // Verify OTP
    if (otpDocument.otp !== otp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    const otpExpirationTime =
      new Date(otpDocument.createdAt).getTime() + 15 * 60 * 1000; // 15 minutes in milliseconds

    if (Date.now() > otpExpirationTime) {
      throw new UnauthorizedException('OTP has expired');
    }

    await this.otpModel.deleteMany({ userEmail: email });
    return 'otp verified successfully';
  }
  async addNewPass(forgetPassword: LoginDto) {
    const { email, password } = forgetPassword;
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userModel.updateOne(
      { email },
      {
        $set: { password: hashedPassword },
      },
    );
    return 'password successfully updated';
  }
  async getUserById(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  private async sendOTPByEmail(email: string, otp: string): Promise<void> {
    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}`,
    };

    await this.transporter.sendMail(mailOptions);
    console.log('OTP sent successfully');
  }
}
