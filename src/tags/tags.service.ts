import { Injectable } from '@nestjs/common';
import { Prisma, tag } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) { }

  async getTag(postWhereUniqueInput: Prisma.tagWhereUniqueInput): Promise<tag | null> {
    return this.prisma.tag.findUnique({
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

  async getFilteredTags(params: {
    include?: Prisma.tagInclude
    skip?: number;
    take?: number;
    cursor?: Prisma.tagWhereUniqueInput;
    where?: Prisma.tagWhereInput;
    orderBy?: Prisma.tagOrderByWithRelationInput;
  }): Promise<tag[]> {
    const { include, skip, take, cursor, where, orderBy } = params;
    return this.prisma.tag.findMany({
      include,
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.tagCreateInput): Promise<tag> {
    return this.prisma.tag.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.tagWhereUniqueInput;
    data: Prisma.tagUpdateInput;
  }): Promise<tag> {
    const { data, where } = params;
    return this.prisma.tag.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.tagWhereUniqueInput): Promise<tag> {
    return this.prisma.tag.delete({
      where,
    });
  }
}
