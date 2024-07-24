import { Injectable } from '@nestjs/common';
import { data, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DatasService {
  constructor(private prisma: PrismaService) { }

  async getData(postWhereUniqueInput: Prisma.dataWhereUniqueInput): Promise<data | null> {
    return this.prisma.data.findUnique({
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

  async getFilteredDatas(params: {
    include?: Prisma.dataInclude
    skip?: number;
    take?: number;
    cursor?: Prisma.dataWhereUniqueInput;
    where?: Prisma.dataWhereInput;
    orderBy?: Prisma.dataOrderByWithRelationInput;
  }): Promise<data[]> {
    const { include, skip, take, cursor, where, orderBy } = params;
    return this.prisma.data.findMany({
      include,
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.dataCreateInput): Promise<data> {
    return this.prisma.data.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.dataWhereUniqueInput;
    data: Prisma.dataUpdateInput;
  }): Promise<data> {
    const { data, where } = params;
    return this.prisma.data.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.dataWhereUniqueInput): Promise<data> {
    return this.prisma.data.delete({
      where,
    });
  }

}
