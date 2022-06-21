import { IsString } from 'class-validator';

export class CreateShelterDto {
  @IsString()
  name: string;
}
