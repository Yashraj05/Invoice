import {
  IsDateString,
  IsMongoId,
  IsNumber,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  projectName?: string;

  @IsOptional()
  @IsDateString()
  periodFrom?: Date;

  @IsOptional()
  @IsDateString()
  periodTo?: Date;

  @IsOptional()
  projectManager?: string;

  @IsOptional()
  @IsNumber()
  ratePerHour?: number;

  @IsOptional()
  @IsNumber()
  conversionRate?: number;

  @IsOptional()
  @IsMongoId()
  adminId?: string;

  @IsOptional()
  @IsNumberString()
  workingHours?: string;

  @IsOptional()
  @IsMongoId()
  clientId?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  paymentStatus?: boolean;
}
