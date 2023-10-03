import { IsString, IsObject, IsNumber } from 'class-validator';

export class ClientDto {
  @IsString()
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
}
