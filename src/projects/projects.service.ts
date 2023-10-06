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
    if (this.calculateAmount(createProjectDto)) {
      const amount = this.calculateAmount(createProjectDto);
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
    if (this.calculateAmount(updateProjectDto)) {
      const amount = this.calculateAmount(updateProjectDto);
      const data = {
        ...updateProjectDto,
        amount,
      };
      await this.projectModel.findByIdAndUpdate(id, data);
    }
    await this.projectModel.findByIdAndUpdate(id, updateProjectDto);
    return 'successfully updated';
  }
  async deleteProjectById(id: string) {
    await this.projectModel.findByIdAndDelete(id);
    return 'successfully deleted';
  }
  calculateAmount(dto: any): number | null {
    const {
      rate,
      workingPeriod,
      workingPeriodType,
      projectPeriod,
      conversionRate,
    } = dto;

    if (workingPeriodType === 'hours') {
      if (rate && workingPeriod && conversionRate) {
        const [hours, minutes] = workingPeriod.split(':');
        const totalHours = parseFloat(hours) + parseFloat(minutes) / 60;
        return rate * totalHours * conversionRate;
      } else {
        return null;
      }
    } else {
      if (rate && workingPeriod && conversionRate && projectPeriod) {
        return (
          (rate / projectPeriod) * parseFloat(workingPeriod) * conversionRate
        );
      } else {
        return null;
      }
    }
  }
}
