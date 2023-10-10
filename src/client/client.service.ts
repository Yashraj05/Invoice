import { Injectable } from '@nestjs/common';
import { ClientDto } from './dto/createClientDto';
import { Client } from './schemas/clients';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user';
import { UpdateClientDto } from './dto/updateClientDto';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}
  async createClient(createClientDto: ClientDto, user: User) {
    try {
      const sameState: boolean =
        createClientDto.address.state === user.address.state;
      const data = Object.assign(
        createClientDto,
        { user: user._id },
        { sameState: sameState },
      );

      const newClient = await this.clientModel.create(data);

      return newClient;
    } catch (error) {
      return 'client with this particular name already exists';
    }
  }
  async getAllClients(user: User) {
    try {
      const clients = await this.clientModel.find({ user: user._id });
      return clients;
    } catch (error) {
      return error;
    }
  }
  async getClientById(id: string) {
    try {
      const client = await this.clientModel.findById(id);
      return client;
    } catch (error) {
      return error;
    }
  }
  async updateClientById(id: string, updateClientDto: UpdateClientDto) {
    try {
      await this.clientModel.findByIdAndUpdate(id, updateClientDto);
      return 'client successfully updated';
    } catch (error) {
      return error;
    }
  }
  async DeleteClientById(id: string) {
    try {
      await this.clientModel.findByIdAndDelete(id);
      return 'client successfully deleted';
    } catch (error) {
      return error;
    }
  }
}
