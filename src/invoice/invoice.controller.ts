import { Controller, Post, Req, UseGuards, Get } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateInvoiceDto } from './dto/createInvoice.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}
  @Post()
  @UseGuards(AuthGuard())
  createInvoice(createInvoiceDto: CreateInvoiceDto, @Req() req) {
    return this.invoiceService.createInvoice(createInvoiceDto, req.user);
  }
  @Get()
  @UseGuards(AuthGuard())
  getAllInvoices() {
    return this.invoiceService.getAllInvoices();
  }
}
