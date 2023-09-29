import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
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
  async forgetPassword(forgetPassword: LoginDto) {
    const { email, password } = forgetPassword;
    const user = await this.userModel.findOne({ email });
    console.log(user);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userModel.updateOne(
      { email },
      {
        $set: { password: hashedPassword },
      },
    );
    return 'password successfully updated';
  }
}
