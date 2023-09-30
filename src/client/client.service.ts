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
    const sameState: boolean =
      createClientDto.address.state === user.address.state;
    const data = Object.assign(
      createClientDto,
      { user: user._id },
      { sameState: sameState },
    );

    const newClient = await this.clientModel.create(data);

    return newClient;
  }
  async getAllClients(user: User) {
    const clients = await this.clientModel.find({ user: user._id });
    return clients;
  }
  async getClientById(id: string) {
    const client = await this.clientModel.findById(id);
    return client;
  }
}
