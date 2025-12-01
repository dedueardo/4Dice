import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const validUser = await this.validateUser(user.email, user.password);
    if (!validUser) throw new UnauthorizedException('Credenciais inválidas');

    const payload = { email: validUser.email, sub: validUser.id };
    
    return {
      user: validUser,
      accessToken: this.jwtService.sign(payload), // camelCase para o frontend
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }), // Token de longa duração
    };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findOneById(payload.sub);
      
      if (!user) throw new UnauthorizedException('Usuário não encontrado');

      const newPayload = { email: user.email, sub: user.id };
      
      return {
        accessToken: this.jwtService.sign(newPayload),
      };
    } catch (e) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }

  async register(userData: any) {
    const existingUser = await this.usersService.findOneByEmail(userData.email);
    if (existingUser) throw new BadRequestException('Email já cadastrado');

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const { confirmPassword, ...dataToSave } = userData;

    const newUser = await this.usersService.create({
      ...dataToSave,
      password: hashedPassword,
    });

    const { password, ...result } = newUser;
    
    // Retornamos user e message conforme esperado pelo frontend (RegisterResponse)
    return { 
      user: result,
      message: 'Usuário cadastrado com sucesso!'
    };
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new BadRequestException('Usuário não encontrado');

    const resetToken = Math.random().toString(36).substring(2, 15);
    await this.usersService.update(user.id, { resetPasswordToken: resetToken });
    await this.mailService.sendPasswordReset(user.email, resetToken);

    return { message: 'Email de recuperação enviado' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.usersService.findOneByResetToken(resetPasswordDto.token);
    if (!user) throw new BadRequestException('Token inválido ou expirado');

    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);
    await this.usersService.update(user.id, {
      password: hashedPassword,
      resetPasswordToken: null as any,
    });

    return { message: 'Senha redefinida com sucesso' };
  }
}