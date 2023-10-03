import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  projectName: string;

  @IsDateString()
  periodFrom: Date;

  @IsDateString()
  periodTo: Date;

  projectManager: string;

  @IsNumberString()
  ratePerHour: string;

  @IsNumber()
  conversionRate: number;

  @IsMongoId()
  adminId: string;

  @IsNumber()
  workingHours: number;

  @IsMongoId()
  clientId: string;

  @IsNumber()
  amount: number;

  paymentStatus: boolean;
}
