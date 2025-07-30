import { IsEmail, IsString, IsPositive, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateNominationRequestDto {
  @IsNotEmpty({ message: 'You must input a full name.' })
  @IsString({ message: 'Please enter a valid string for full name.' })
  fullName: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email: string;

  @IsString()
  nominee: string;
  
  @IsNotEmpty({ message: 'You must input constituency.' })
  @IsString({ message: 'Please enter a valid string for constituency.' })
  constituency: string;

  @IsNotEmpty({ message: 'You must input a college name.' })
  @IsString({ message: 'Please enter a valid string for college name.' })
  college: string;

  @IsNotEmpty({ message: 'You must input a major.' })
  @IsString({ message: 'Please enter a valid string for your major.' })
  major: string;

  @IsNotEmpty({ message: 'You must input graduation year.' })
  @IsPositive({ message: 'Please enter a valid positive integer for graduation year.' })
  graduationYear: number;

  @IsBoolean()
  receiveSenatorInfo: boolean;
}
