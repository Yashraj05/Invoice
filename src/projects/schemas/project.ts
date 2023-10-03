import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Document, SchemaTypes } from 'mongoose';
import { User } from 'src/auth/schemas/user';
import { Client } from 'src/client/schemas/clients';
@Schema({ timestamps: true })
export class Project extends Document {
  @Prop()
  projectName: string;
  @Prop({ type: SchemaTypes.Date }) // Specify the data type as SchemaTypes.Date
  periodFrom: Date;
  @Prop({ type: SchemaTypes.Date }) // Specify the data type as SchemaTypes.Date
  periodTo: Date;
  @Prop()
  ratePerHour: number;
  @Prop()
  projectManager: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  adminId: User;
  @Prop()
  workingHours: number;
  @Prop()
  conversionRate: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  clientId: Client;
  @Prop()
  amount: number;
  @Prop()
  paymentStatus: string;
}
export const ProjectSchema = SchemaFactory.createForClass(Project);
