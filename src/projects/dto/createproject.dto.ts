import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
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
  rate?: number;

  @IsNumber()
  @IsNotEmpty()
  conversionRate: number;

  @IsMongoId()
  @IsNotEmpty()
  adminId: string;

  @IsOptional()
  @IsNumber()
  workingPeriod?: number;

  @IsOptional()
  workingPeriodType?: 'hours' | 'months';

  @IsMongoId()
  @IsNotEmpty()
  clientId: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsNotEmpty()
  paymentStatus: boolean;

  @IsOptional()
  currencyType: 'rupees' | 'dollars';
}
