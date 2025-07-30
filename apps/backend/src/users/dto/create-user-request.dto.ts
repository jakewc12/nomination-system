import { IsString } from 'class-validator';

export class CreateUserRequestDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
