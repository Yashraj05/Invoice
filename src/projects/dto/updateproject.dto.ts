import { IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  projectName?: string;

  @IsOptional()
  projectManager?: string;

  @IsOptional()
  @IsNumber()
  rate?: number;

  @IsNumber()
  @IsOptional()
  conversionRate?: number;

  @IsMongoId()
  @IsOptional()
  adminId?: string;

  @IsOptional()
  @IsNumber()
  workingPeriod?: string | number;

  @IsOptional()
  workingPeriodType?: 'hours' | 'days';

  @IsMongoId()
  @IsOptional()
  clientId?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  paymentStatus?: boolean;

  @IsOptional()
  currencyType?: 'rupees' | 'dollars' | 'pounds';
  @IsOptional()
  description: string;
  @IsOptional()
  projectPeriod: number;
}
