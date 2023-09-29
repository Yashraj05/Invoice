import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  @Expose({ name: 'email', toPlainOnly: true })
  email: string;
  @Exclude()
  password: string;
}
