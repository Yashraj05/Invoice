import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice } from './schemas/invoice';
import { Model } from 'mongoose';
import { CreateInvoiceDto } from './dto/createInvoice.dto';
import { User } from 'src/auth/schemas/user';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
  ) {}
  async createInvoice(createInvoiceDto: CreateInvoiceDto, user: User) {
    console.log(createInvoiceDto);
    console.log(user);
    const data = Object.assign(
      createInvoiceDto,
      { invoiceNo: user.invoiceNo },
      { adminId: user._id },
    );

    const invoice = await this.invoiceModel.create(data);
    console.log(user.invoiceNo);

    user.invoiceNo = (parseInt(user.invoiceNo) + 1).toString();

    return invoice;
  }
  async getAllInvoices() {
    const invoices = await this.invoiceModel.find();
    return invoices;
  }
}
