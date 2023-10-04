import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  @Expose({ name: 'email', toPlainOnly: true })
  email: string;
  @Exclude()
  password: string;
  @Expose()
  companyName: string;
  @Expose()
  gistin: string;
  @Expose()
  contactNo: string;
  @Expose()
  pancardNo: string;
  @Expose()
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  @Expose()
  invoiceNo: string;
  @Expose()
  companyLogo: string;
}
