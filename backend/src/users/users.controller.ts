import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/avatars',
      filename: (req, file, cb) => {
        // Gera um nome aleatório para evitar conflitos
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Request() req) {
    // 1. Monta a URL pública que será salva no banco
    const avatarUrl = `/uploads/avatars/${file.filename}`;
    
    // 2. Usa o método 'update' que já existe no service, passando o ID do usuário logado
    return this.usersService.update(req.user.userId, { avatarUrl });
  }
}
