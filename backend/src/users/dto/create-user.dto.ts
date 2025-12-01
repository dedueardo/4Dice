import { IsEmail, IsNotEmpty, MinLength, MaxLength, Matches, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome de usuário é obrigatório' })
  @IsString()
  @MinLength(3, { message: 'O nome de usuário deve ter no mínimo 3 caracteres' })
  @MaxLength(20, { message: 'O nome de usuário deve ter no máximo 20 caracteres' })
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Username só pode conter letras, números e underscore' })
  username: string;

  @IsNotEmpty({ message: 'O email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  password: string;

  // O campo avatarUrl é opcional pois é gerado pelo backend após o upload
  @IsOptional()
  avatarUrl?: string;
}
