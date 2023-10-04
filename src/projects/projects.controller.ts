import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/createproject.dto';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProjectDto } from './dto/updateproject.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}
  @Post()
  @UseGuards(AuthGuard())
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }
  @Get('/client/:id')
  @UseGuards(AuthGuard())
  getAllProjects(@Param('id') id: string) {
    return this.projectService.getAllProjects(id);
  }
  @Get(':id')
  @UseGuards(AuthGuard())
  getProjectById(@Param('id') id: string) {
    return this.projectService.getProjectById(id);
  }
  @Patch(':id')
  @UseGuards(AuthGuard())
  updateProjectById(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.updateProjectById(id, updateProjectDto);
  }
  @Delete(':id')
  @UseGuards(AuthGuard())
  deleteProjectById(@Param('id') id: string) {
    return this.projectService.deleteProjectById(id);
  }
  // @UseGuards(AuthGuard())
  // @Post(':projectId/calculate-cost')
  // async calculateCost(
  //   @Param('projectId') projectId: string,
  //   @Body('workingHours') workingHours: string,
  // ) {
  //   const { cost, project } = await this.projectService.calculateProjectCost(
  //     projectId,
  //     workingHours,
  //   );
  //   return { cost, project };
  // }
}
