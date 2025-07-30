import { IsString } from 'class-validator';
import { CreateNominationRequestDto } from './create-nomination-request.dto';
import { Status } from '../nominations.types';

export class UpdateNominationRequestDto extends CreateNominationRequestDto {
  @IsString()
  status: Status;
}
