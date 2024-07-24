import { Module } from '@nestjs/common';
import { SendinblueService } from './sendinblue.service';

@Module({
  controllers: [],
  providers: [SendinblueService]
})
export class SendinblueModule {}
