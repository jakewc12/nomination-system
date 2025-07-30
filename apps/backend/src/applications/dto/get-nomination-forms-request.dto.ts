import { IsArray, ValidateNested, IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

class NomineeDTO {
  @IsNotEmpty({ message: 'Full name is required for each nominee.' })
  @IsString({ message: 'Nominee full name must be a string.' })
  fullName: string;

  @IsNotEmpty({ message: 'Email is required for each nominee.' })
  @IsEmail({}, { message: 'Nominee email must be a valid email address.' })
  email: string;
}

export class GetNominationFormDTO {
  @IsArray({ message: 'Nominees must be an array.' })
  @ValidateNested({ each: true, message: 'Each nominee must be valid.' })
  @Type(() => NomineeDTO)
  nominees: NomineeDTO[];

  @IsArray({ message: 'Constituencies must be an array.' })
  @IsString({ each: true, message: 'Each constituency must be a string.' })
  constituencies: string[];
}