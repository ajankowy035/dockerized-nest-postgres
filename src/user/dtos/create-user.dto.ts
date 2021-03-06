import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  admin: boolean;

  @IsString()
  password: string;
}
