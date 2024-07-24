import * as nodemailer from 'nodemailer';
import { default as config } from '../config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, user } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.userCreateInput): Promise<user> {

    //Verifica se já existe um usuario com esse email ou username
    const usersEmailExists =
      await this.prisma.user.findFirst({
        where: { username: data.username }
      });

    if (usersEmailExists)
      throw new HttpException('Esse email já esta cadastrado', HttpStatus.BAD_REQUEST);

    var newPwdHash = await this.generatePwdHash(data.password);
    data.password = newPwdHash;
    data.token = (Math.floor(Math.random() * (9000000)) + 1000000).toString()

    let modelUser = await this.prisma.user.create({
      data
    });

    await this.sendEmailVerification(modelUser);

    return modelUser;
  }

  async generatePwdHash(pwd: string): Promise<string> {
    const saltOrRounds = 10;
    const password = pwd;
    return await bcrypt.hash(password, saltOrRounds);
  }

  findAll() {
    return `This action returns all users`;
  }
  async updateUser(params: {
    where: Prisma.userWhereUniqueInput;
    data: Prisma.userUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUser(username: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({ where: { username: username } });
  }

  async pwdCorrect(pwdText: string, pwdHash: string): Promise<boolean> {

    return await bcrypt.compare(pwdText, pwdHash);;
  }

  async sendEmailVerification(model: user): Promise<boolean> {

    if (model && model.token) {
      let transporter = nodemailer.createTransport({
        host: config.mail.host,
        port: config.mail.port,
        secure: config.mail.secure, // true for 465, false for other ports
        auth: {
          user: config.mail.user,
          pass: config.mail.pass
        }
      });

      let mailOptions = {
        from: '"JarJar" <' + config.mail.user + '>',
        to: model.username, // list of receivers (separated by ,)
        subject: 'JarJar Verificação de email',
        text: 'JarJar Verificação de email',
        html: 'Olá, Bem-vindo ao JarJar <br><br> <br><br> Para completar seu cadastro confirme seu email no link abaixo<br><br>' +
          '<a href=' + config.host.url + '/api/users/validate/email/' + model.token + '>Clique aqui para ativar sua conta</a>'  // html body
      };
      
      var sent = await new Promise<boolean>(async function (resolve, reject) {
        return await transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.log('Message sent: %s', error);
            return reject(false);
          }
          console.log('Message sent: %s', info.messageId);
          resolve(true);
        });
      })

      return sent;
    } else {
      throw new HttpException('REGISTER.USER_NOT_REGISTERED', HttpStatus.FORBIDDEN);
    }
  }

  async verifyEmail(token: string): Promise<boolean> {
    var userVerif = await this.prisma.user.findFirst({ where: { token: token } });
    if (userVerif && userVerif.username) {
      userVerif.isEmailConfirmed = true;
      await this.updateUser(
        {
          data: userVerif,
          where: { id: userVerif.id }
        }
      );
      return true;
    } else {
      throw new HttpException('LOGIN.EMAIL_CODE_NOT_VALID', HttpStatus.FORBIDDEN);
    }
  }
}
