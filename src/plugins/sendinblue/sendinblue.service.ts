import { Injectable } from '@nestjs/common';
import { format } from 'path';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class SendinblueService {

    async createLead(createLeadDto: CreateLeadDto): Promise<any> {

        const SibApiV3Sdk = require('sib-api-v3-typescript');
        let apiInstance = new SibApiV3Sdk.ContactsApi()

        let apiKey = apiInstance.authentications['apiKey'];

        apiKey.apiKey = process.env.SECRET_SENDINBLUE;

        let createContact = new SibApiV3Sdk.CreateContact();
     
        let phone = '+55' + createLeadDto.phone.substring(1,3) 
                            + createLeadDto.phone.substring(5,6)
                            + createLeadDto.phone.substring(7,11)
                            + createLeadDto.phone.substring(12)
        

        let attributes = {
            "NOME": createLeadDto.name,
            "SOBRENOME": createLeadDto.lastName,
            "SMS": phone,
            "COMPANY": createLeadDto.company,
            "CARGO": createLeadDto.cargo,
            "TAG": createLeadDto.tag
        }

        createContact.email = createLeadDto.email;
        createContact.attributes = attributes;
        createContact.listIds = [2];

        console.log(`Model created to Sendinblue: ${JSON.stringify(createContact)}`);

        await apiInstance.createContact(createContact).then(function (data) {
            console.log('API Sendinblue called successfully. Returned data: ' + JSON.stringify(data.body));
            return true;
        }, function (error) {
            console.error(`Sendinblue error: ${JSON.stringify(error.response.body)}`);
            return false;
        });
    }
}
