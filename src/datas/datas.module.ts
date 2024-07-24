import { Module } from '@nestjs/common';
import { DatasService } from './datas.service';
import { DatasController } from './datas.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DatasController],
  providers: [DatasService, PrismaService]
})
export class DatasModule {}
