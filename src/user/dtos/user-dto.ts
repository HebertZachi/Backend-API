import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Matches(/@gmail\.com$/, {
    message: 'O domínio do e-mail deve ser "@gmail.com".',
  })
  email: string;

  @IsString()
  password: string;
}

export class UpdateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Expose()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  password: string;
}
