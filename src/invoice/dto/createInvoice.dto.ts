import { IsDateString, IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  invoiceNo: string;

  @IsDateString()
  billDate: Date;

  @IsDateString()
  dueDate: Date;

  @IsMongoId()
  clientId: string; // Assuming that the client's ID will be sent as a string

  @IsMongoId()
  adminId: string;

  @IsMongoId({ each: true })
  // @ValidateNested({ each: true })
  // @Type(() => String)
  projectsId: string[]; // Assuming that an array of project IDs will be sent as strings
  @IsNumber()
  amountWithoutTax: number;
  @IsNumber()
  amountAfterTax: number;
}
