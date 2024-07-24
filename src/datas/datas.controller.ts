import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DatasService } from './datas.service';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';

@Controller('datas')
export class DatasController {
  constructor(private readonly datasService: DatasService) { }

  //@UseGuards(JwtAuthGuard)
  @Post()
  async createData(
    @Body() dataData: CreateDataDto,
  ): Promise<CreateDataDto> {
    const { title, content, id_user } = dataData;
    return this.datasService.create(
      {
        title,
        content,
        user: {
          connect: { id: id_user }
        }
      }
    );
  }

  //@UseGuards(JwtAuthGuard)
  @Put()
  async updateData(
    @Body() dataData: UpdateDataDto,
  ): Promise<UpdateDataDto> {
    const { title, content, id } = dataData;
    return this.datasService.update(
      {
        data: {
          title: title,
          content: content
        },
        where: { id: id }
      }
    );
  }

  //@UseGuards(JwtAuthGuard)
  @Get(':id')
  async getDataById(@Param('id') id: string)
    : Promise<CreateDataDto> {
    return this.datasService.getData({ id: Number(id) });
  }

  //@UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  async getdatasByUserId(@Param('id') userId: string)
    : Promise<CreateDataDto[]> {
    return this.datasService.getFilteredDatas({
      where: {
        id_user: Number(userId)
      }
    });
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.datasService.delete({ id: Number(id) });
  }

}
