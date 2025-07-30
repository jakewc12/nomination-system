import { IsEmail, IsString, IsPositive, IsNotEmpty, IsOptional, Matches, Min, Max } from 'class-validator';

export class CreateApplicationRequestDto {
  @IsNotEmpty({ message: 'You must input a full name.' })
  @IsString({ message: 'Please enter a valid string for full name.' })
  fullName: string;

  @IsOptional()
  @IsString({ message: 'Please enter a valid string for preferred full name.' })
  preferredFullName: string;

  @IsOptional()
  @IsString({ message: 'Please enter a valid string for phonetic pronunciation.' })
  phoneticPronunciation: string;

  @IsOptional()
  @IsString({ message: 'Please enter a valid string for nickname.' })
  nickname: string;

  @IsNotEmpty({ message: 'You must input an NUID.' })
  @Matches(/^\d{9}$/, { message: 'An NUID must be exactly 9 digits long' })
  nuid: string;

  @IsOptional()
  @IsString({ message: 'Please enter a valid string for pronouns.' })
  pronouns: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid northeastern email address.' })
  email: string;

  @IsOptional()
  @Matches(/^\+?\d{10,15}$/, { message: 'Phone number must be between 10 and 15 digits, optionally starting with "+".'})
  phoneNumber: string;

  @IsNotEmpty()
  @Min(1, { message: 'Year must be between 1 and 5. The inputted year is less than 1' })
  @Max(5, { message: 'Year must be between 1 and 5. The inputted year is more than 5' })
  year: number;

  @IsNotEmpty({ message: 'You must input a college name.' })
  @IsString({ message: 'Please enter a valid string for college name.' })
  college: string;

  @IsNotEmpty({ message: 'You must input a major.' })
  @IsString({ message: 'Please enter a valid string for your major.' })
  major: string;

  @IsOptional()
  @IsString({ message: 'Please enter a valid string for your minor.' })
  minors: string;
  
  @IsNotEmpty({ message: 'You must input constituency.' })
  @IsString({ message: 'Please enter a valid string for constituency.' })
  constituency: string;

  @IsNotEmpty({ message: 'You must input constituencyName.' })
  @IsString({ message: 'Please enter a valid string for constituencyName.' })
  constituencyName: string;

  @IsNotEmpty({ message: 'You must input selectedConstituencyType.' })
  @IsString({ message: 'Please enter a valid string for selectedConstituencyType.' })
  selectedConstituencyType: string;

  @IsNotEmpty({ message: 'You must input selectedReturningType.' })
  @IsString({ message: 'Please enter a valid string for selectedReturningType.' })
  selectedReturningType: string;

  @IsNotEmpty({ message: 'You must input selectedAttestation.' })
  @IsString({ message: 'Please enter a valid string for selectedAttestation.' })
  selectedAttestation: string;

  @IsOptional()
  @IsString({ message: 'Please enter a valid string for semester.' })
  semester?: string;
}