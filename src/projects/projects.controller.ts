import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateProjectDto } from './dto/createproject.dto';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '@nestjs/passport';

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
