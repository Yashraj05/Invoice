import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const { token, user } = await this.authService.login(loginDto);
    const userDto = new UserDto();
    userDto.email = user.email;
    userDto.password = user.password;
    return { token, userDto };
  }
  @Post('/forget')
  async forget(@Body() forgetPassword: LoginDto) {
    return this.authService.forgetPassword(forgetPassword);
  }
}
