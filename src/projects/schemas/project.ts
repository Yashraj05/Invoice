import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Document, SchemaTypes } from 'mongoose';
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
  ratePerHour: string;
  @Prop()
  workingHours: string;
  @Prop()
  conversionRate: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  client: Client;
  @Prop()
  amount: string;
}
export const ProjectSchema = SchemaFactory.createForClass(Project);
