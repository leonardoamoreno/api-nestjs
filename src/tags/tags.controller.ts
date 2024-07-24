import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTag(
    @Body() tagData: CreateTagDto,
  ): Promise<CreateTagDto> {
    const { name, id_user } = tagData;
    return this.tagsService.create(
      {
        name,
        user: {
          connect: { id: id_user }
        }
      }
    );
  }

  //@UseGuards(JwtAuthGuard)
  @Put()
  async updateTag(
    @Body() tagData: UpdateTagDto,
  ): Promise<UpdateTagDto> {
    const { name, id } = tagData;
    return this.tagsService.update(
      {
        data: {
          name: name
        },
        where: { id: id }
      }
    );
  }

  //@UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTagById(@Param('id') id: string)
    : Promise<CreateTagDto> {
    return this.tagsService.getTag({ id: Number(id) });
  }

  //@UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  async getTagsByUserId(@Param('id') userId: string)
    : Promise<CreateTagDto[]> {
    return this.tagsService.getFilteredTags({
      where: {
        id_user: Number(userId)
      }
    });
  }

  //@UseGuards(JwtAuthGuard)
  @Get('/user/:id/name/:name')
  async getTagsByName(@Param('id') idUser: string, @Param('name') name: string)
    : Promise<CreateTagDto[]> {
    return this.tagsService.getFilteredTags({
      where: {
        AND: [
          {
            name: name,
            id_user: Number(idUser)
          }
        ]
      }
    });
  }

  @Get('/data/:id')
  async getTagsByDataId(@Param('id') idData: string)
    : Promise<CreateTagDto[]> {
    return this.tagsService.getFilteredTags({      
      where: {
        tags_datas: {
          some: {
            id_data: Number(idData)
          }
        }
      }
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.tagsService.delete({ id: Number(id) });
  }
}
