import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  projectName: string;

  @IsNotEmpty()
  @IsDateString()
  periodFrom: Date;

  @IsNotEmpty()
  @IsDateString()
  periodTo: Date;

  @IsOptional()
  projectManager?: string;

  @IsOptional()
  @IsNumber()
  ratePerHour?: number;

  @IsNumber()
  @IsNotEmpty()
  conversionRate: number;

  @IsMongoId()
  @IsNotEmpty()
  adminId: string;

  @IsOptional()
  @IsNumberString()
  workingHours?: string;

  @IsMongoId()
  @IsNotEmpty()
  clientId: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsNotEmpty()
  paymentStatus: boolean;

  @IsNotEmpty()
  isDollar: boolean;
}
