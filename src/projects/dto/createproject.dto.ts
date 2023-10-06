import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  projectName: string;

  @IsOptional()
  @IsString()
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
  workingPeriod?: string;

  @IsOptional()
  workingPeriodType?: 'hours' | 'days';

  @IsMongoId()
  @IsNotEmpty()
  clientId: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsNotEmpty()
  paymentStatus: boolean;

  @IsOptional()
  currencyType?: 'rupees' | 'dollars' | 'pounds';
  @IsOptional()
  description: string;
  @IsOptional()
  projectPeriod: number;
}
