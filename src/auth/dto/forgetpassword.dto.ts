import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ForgetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly email: string;
}
