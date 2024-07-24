import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProject(
    @Body() projectData: CreateProjectDto,
  ): Promise<CreateProjectDto> {
    const { name, id_user, create_date, description } = projectData;
    return this.projectsService.create(
      {
        name,  
        description,      
        user: {
          connect: { id: id_user }
        }
      }
    );
  }

  //@UseGuards(JwtAuthGuard)
  @Put()
  async updateProject(
    @Body() projectData: UpdateProjectDto,
  ): Promise<UpdateProjectDto> {
    const { name, id, description } = projectData;
    return this.projectsService.update(
      {
        data: {
          name: name,
          description: description
        },
        where: { id: id }
      }
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProjectById(@Param('id') id: string)
    : Promise<CreateProjectDto> {
    return this.projectsService.getProject({ id: Number(id) });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  async getProjectsByUserId(@Param('id') userId: string)
    : Promise<CreateProjectDto[]> {
    return this.projectsService.getFilteredProjects({
      where: {
        id_user: Number(userId)
      }
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.projectsService.delete({ id: Number(id) });
  }

}
