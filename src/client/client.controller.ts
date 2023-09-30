import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Param,
  Get,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './dto/createClientDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}
  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() createClientDto: ClientDto, @Req() req) {
    return this.clientService.createClient(createClientDto, req.user);
  }
  @UseGuards(AuthGuard())
  @Get()
  async getAllClients(@Req() req) {
    return this.clientService.getAllClients(req.user);
  }
  @UseGuards(AuthGuard())
  @Get(':id')
  async getClientById(@Param('id') id: string) {
    return this.clientService.getClientById(id);
  }
}
