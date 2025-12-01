import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false, // Geralmente false para porta 587
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
      // ADICIONE ESTE BLOCO TLS
      tls: {
        rejectUnauthorized: false 
      }
    });
  }

  async sendPasswordReset(email: string, token: string) {
    // URL opcional, caso o usuário ainda queira clicar
    const url = `http://localhost:5173/reset-password?token=${token}`;
    
    await this.transporter.sendMail({
      from: '"4Dice Support" <noreply@4dice.com>',
      to: email,
      subject: 'Código de Recuperação de Senha',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Recuperação de Senha</h2>
          <p>Você solicitou a redefinição de sua senha.</p>
          <p>Copie o código abaixo e cole na aplicação:</p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0;">
            ${token}
          </div>
          <p>Ou clique no link: <a href="${url}">Redefinir Senha</a></p>
          <p>Se não foi você, ignore este e-mail.</p>
        </div>
      `,
    });
    
    console.log(`Email enviado para ${email} (Token: ${token})`);
  }
}