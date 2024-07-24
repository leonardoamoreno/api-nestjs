import { Injectable } from '@nestjs/common';
import { lead } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { SendinblueService } from 'src/plugins/sendinblue/sendinblue.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Injectable()
export class LeadsService {

  constructor(
    private sendinblueService: SendinblueService,
    private prisma: PrismaService) { }

  async create(createLeadDto: CreateLeadDto): Promise<lead> {
    
    await this.sendinblueService.createLead(createLeadDto);

    const { name, lastName, email, phone, company, cargo, tag } = createLeadDto;
        
    return await this.prisma.lead.create({
      data: {
        name,
        lastName,
        email,
        phone,
        company,
        cargo,
        tag
      }
    });
  }

  findAll() {
    return `This action returns all leads`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lead`;
  }

  update(id: number, updateLeadDto: UpdateLeadDto) {
    return `This action updates a #${id} lead`;
  }

  remove(id: number) {
    return `This action removes a #${id} lead`;
  }
}
