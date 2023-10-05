import { IsDateString, IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  projectName: string;

  @IsOptional()
  @IsDateString()
  periodFrom: Date;

  @IsOptional()
  @IsDateString()
  periodTo: Date;

  @IsOptional()
  projectManager?: string;

  @IsOptional()
  @IsNumber()
  rate?: number;

  @IsNumber()
  @IsOptional()
  conversionRate: number;

  @IsMongoId()
  @IsOptional()
  adminId: string;

  @IsOptional()
  @IsNumber()
  workingPeriod?: number;

  @IsOptional()
  workingPeriodType?: 'hours' | 'months';

  @IsMongoId()
  @IsOptional()
  clientId: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  paymentStatus: boolean;

  @IsOptional()
  currencyType: 'rupees' | 'dollars';
}
