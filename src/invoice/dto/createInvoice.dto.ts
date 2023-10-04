import { IsDateString, IsMongoId, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInvoiceDto {
  @IsDateString()
  billDate: Date;

  @IsDateString()
  dueDate: Date;

  @IsMongoId()
  clientId: string; // Assuming that the client's ID will be sent as a string

  @IsMongoId({ each: true })
  @ValidateNested({ each: true })
  @Type(() => String)
  projects: string[]; // Assuming that an array of project IDs will be sent as strings
}
