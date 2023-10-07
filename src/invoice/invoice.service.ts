import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice } from './schemas/invoice';
import { Model } from 'mongoose';
import { CreateInvoiceDto } from './dto/createInvoice.dto';
import { User } from 'src/auth/schemas/user';
import { Project } from 'src/projects/schemas/project';
import { Client } from 'src/client/schemas/clients';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Client.name) private clientModel: Model<Client>,
  ) {}
  async createInvoice(createInvoiceDto: CreateInvoiceDto, user: User) {
    const { clientId, projects } = createInvoiceDto;
    let amountBeforeGst = 0;
    for (let i = 0; i < projects.length; i++) {
      const id = projects[i];
      const project = await this.projectModel.findById(id);
      amountBeforeGst = amountBeforeGst + project.amount;
    }
    const client = await this.clientModel.findById(clientId);
    let cgst = 0;
    let sgst = 0;
    if (client.sameState) {
      cgst = 0.09 * amountBeforeGst;
      sgst = 0.09 * amountBeforeGst;
    } else {
      cgst = 0.18 * amountBeforeGst;
    }

    const amountAfterGst = amountBeforeGst + cgst + sgst;

    console.log({ ...createInvoiceDto });
    console.log(user);
    const data = {
      ...createInvoiceDto,
      invoiceNo: user.invoiceNo,
      adminId: user._id,
      amountAfterGst: +amountAfterGst.toFixed(2),
      amountBeforeGst: +amountAfterGst.toFixed(2),
      cgst: +cgst.toFixed(2),
      sgst: +sgst.toFixed(2),
    };

    const invoice = await this.invoiceModel.create(data);
    console.log(user.invoiceNo);

    user.invoiceNo = (parseInt(user.invoiceNo) + 1).toString();
    user.save();

    return invoice;
  }
  async getAllInvoices() {
    const invoices = await this.invoiceModel.find();
    return invoices;
  }
  async getInvoiceById(id: string) {
    return await this.invoiceModel.findById(id);
  }
}
