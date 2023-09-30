import { IsDateString, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  projectName: string;

  @IsDateString()
  periodFrom: Date;

  @IsDateString()
  periodTo: Date;

  @IsNumberString()
  ratePerHour: string;

  @IsNumberString()
  conversionRate: string;
}
