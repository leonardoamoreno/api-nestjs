import { Test, TestingModule } from '@nestjs/testing';
import { SendinblueService } from './sendinblue.service';

describe('SendinblueService', () => {
  let service: SendinblueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendinblueService],
    }).compile();

    service = module.get<SendinblueService>(SendinblueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
