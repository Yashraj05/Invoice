import { Injectable } from '@nestjs/common';
import { ClientDto } from './dto/createClientDto';
import { Client } from './schemas/clients';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}
  async createClient(createClientDto: ClientDto, user: User) {
    const data = Object.assign(createClientDto, { user: user._id });

    const newClient = await this.clientModel.create(data);

    return newClient;
  }
}
