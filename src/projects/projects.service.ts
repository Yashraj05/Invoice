import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/createproject.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
  ) {}
  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = new this.projectModel({
      ...createProjectDto,
    });

    return project.save();
  }
  async getAllProjects(id: string) {
    const projects = await this.projectModel.find({ client: id });
    return projects;
  }
  async getProjectById(id: string) {
    const project = await this.projectModel.findById(id);
    return project;
  }
  // async calculateProjectCost(projectId: string, workingHours: string) {
  //   const project = await this.projectModel.findById(projectId).exec();

  //   if (!project) {
  //     throw new Error('Project not found');
  //   }

  //   const { ratePerHour, conversionRate } = project;
  //   const [hours, minutes] = workingHours.split(':');
  //   const totalHours = parseFloat(hours) + parseFloat(minutes) / 60;
  //   const cost =
  //     totalHours * parseFloat(ratePerHour) * parseFloat(conversionRate);
  //   await this.projectModel.findByIdAndUpdate(projectId, {
  //     $set: { workingHours: workingHours, amount: cost },
  //   });
  //   return { cost, project };
  // }
}
