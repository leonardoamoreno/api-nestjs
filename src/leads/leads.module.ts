import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { PrismaService } from 'src/prisma.service';
import { SendinblueService } from 'src/plugins/sendinblue/sendinblue.service';

@Module({
  controllers: [LeadsController],
  providers: [
    LeadsService,
    PrismaService,
    SendinblueService]
})
export class LeadsModule { }
