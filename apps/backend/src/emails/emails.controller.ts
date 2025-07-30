import { Body, Controller, Post } from '@nestjs/common';

import { EmailsService } from './emails.service';
import { CreateEmailRequestDto } from './dto/create-email-request.dto';

@Controller('/emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Post('/send')
  sendEmail(@Body() request: CreateEmailRequestDto) {
    return this.emailsService.createEmail(request);
  }
}
