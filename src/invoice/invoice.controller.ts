import { Controller, Post, UseGuards, Get, Body, Param } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateInvoiceDto } from './dto/createInvoice.dto';
@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}
  @Post()
  @UseGuards(AuthGuard())
  createInvoice(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.createInvoice(createInvoiceDto);
  }
  @Get()
  @UseGuards(AuthGuard())
  getAllInvoices() {
    return this.invoiceService.getAllInvoices();
  }
  @Get(':id')
  @UseGuards(AuthGuard())
  getInvoiceById(@Param('id') id: string) {
    return this.invoiceService.getInvoiceById(id);
  }
}
