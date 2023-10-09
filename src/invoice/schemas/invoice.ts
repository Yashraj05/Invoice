import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Document, SchemaTypes } from 'mongoose';
import { User } from 'src/auth/schemas/user';
import { Client } from 'src/client/schemas/clients';
import { Project } from 'src/projects/schemas/project';
@Schema({ timestamps: true })
export class Invoice extends Document {
  @Prop()
  invoiceNo: string;
  @Prop({ type: SchemaTypes.Date }) // Specify the data type as SchemaTypes.Date
  billDate: Date;
  @Prop({ type: SchemaTypes.Date }) // Specify the data type as SchemaTypes.Date
  dueDate: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  clientId: Client;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  adminId: User;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] })
  projects: Project[];
  @Prop()
  amountBeforeGst: number;
  @Prop()
  amountAfterGst: number;
  @Prop()
  cgst: number;
  @Prop()
  sgst: number;
}
export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
