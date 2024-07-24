import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { PrismaService } from './prisma.service';
import { DatasModule } from './datas/datas.module';
import { DatasService } from './datas/datas.service';
import { TagsModule } from './tags/tags.module';
import { TagsService } from './tags/tags.service';
import { SendinblueModule } from './plugins/sendinblue/sendinblue.module';
import { ConfigModule } from '@nestjs/config';
import { SendinblueService } from './plugins/sendinblue/sendinblue.service';
import { LeadsModule } from './leads/leads.module';

@Module({
  imports:
    [
      ConfigModule.forRoot(),
      UsersModule,
      AuthModule,
      ProjectsModule,
      DatasModule,
      TagsModule,
      SendinblueModule,
      LeadsModule
    ],
  controllers:
    [
      AppController
    ],
  providers: [
    AppService,
    PrismaService,
    DatasService,
    TagsService,
    SendinblueService],
})
export class AppModule { }
