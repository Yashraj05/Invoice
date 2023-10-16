import {
  IsString,
  IsObject,
  IsNumber,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class ClientDto {
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  gistin: string;

  @IsString()
  contactNo: string;

  @IsString()
  pancardNo: string;

  @IsObject()
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  @IsNumber()
  conversionRate: number;
  @IsEmail()
  email: string;
}
