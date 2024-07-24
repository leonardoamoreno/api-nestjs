import { Injectable } from '@nestjs/common';
import { Prisma, project } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) { }

  async getProject(postWhereUniqueInput: Prisma.projectWhereUniqueInput): Promise<project | null> {
    return this.prisma.project.findUnique({
      include: {
        user: {
          select: {
            id: true
          }
        }
      },
      where: postWhereUniqueInput,
    });
  }

  async getFilteredProjects(params: {
    include?: Prisma.projectInclude
    skip?: number;
    take?: number;
    cursor?: Prisma.projectWhereUniqueInput;
    where?: Prisma.projectWhereInput;
    orderBy?: Prisma.projectOrderByWithRelationInput;
  }): Promise<project[]> {
    const { include, skip, take, cursor, where, orderBy } = params;
    return this.prisma.project.findMany({
      include,
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.projectCreateInput): Promise<project> {
    return this.prisma.project.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.projectWhereUniqueInput;
    data: Prisma.projectUpdateInput;
  }): Promise<project> {
    const { data, where } = params;
    return this.prisma.project.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.projectWhereUniqueInput): Promise<project> {
    return this.prisma.project.delete({
      where,
    });
  }
}
