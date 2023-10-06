import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/createproject.dto';
import { UpdateProjectDto } from './dto/updateproject.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
  ) {}
  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const { rate, workingPeriod, conversionRate } = createProjectDto;
    if (rate && workingPeriod && conversionRate) {
      console.log(rate);
      console.log(conversionRate);
      console.log(workingPeriod);
      const amount = workingPeriod * rate * conversionRate;
      console.log(amount);
      const data = {
        ...createProjectDto,
        amount,
      };
      return await this.projectModel.create(data);
    }

    const project = new this.projectModel({
      ...createProjectDto,
    });

    return project.save();
  }
  async getAllProjects(id: string) {
    const projects = await this.projectModel.find({ clientId: id });
    return projects;
  }
  async getProjectById(id: string) {
    const project = await this.projectModel.findById(id);
    return project;
  }
  async updateProjectById(id: string, updateProjectDto: UpdateProjectDto) {
    //caculation of cost starts
    // eslint-disable-next-line prefer-const
    const { rate, workingPeriod, conversionRate } = updateProjectDto;
    if (rate && workingPeriod && conversionRate) {
      console.log(rate);
      console.log(conversionRate);
      console.log(workingPeriod);
      const amount = workingPeriod * rate * conversionRate;
      console.log(amount);
      const data = {
        ...updateProjectDto,
        amount,
      };
      await this.projectModel.findByIdAndUpdate(id, data);
      return 'successfully updated';
    }

    //calculation of cost ends

    await this.projectModel.findByIdAndUpdate(id, updateProjectDto);
    return 'successfully updated';
  }
  async deleteProjectById(id: string) {
    await this.projectModel.findByIdAndDelete(id);
    return 'successfully deleted';
  }
  // async calculateProjectCost(
  //   currencyType: 'rupees' | 'dollars',
  //   rate: number,
  //   conversionRate: number,
  //   workingPeriod: number,
  // ) {
  //   if (currencyType === 'rupees') {
  //     conversionRate = 1;
  //   }
  //   const cost =
  //     workingPeriod * rate * conversionRate;
  //   await this.projectModel.findByIdAndUpdate(projectId, {
  //     $set: { workingHours: workingHours, amount: cost },
  //   });
  //   return { cost, project };
  // }
}
