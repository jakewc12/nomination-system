import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateEmailRequestDto } from './dto/create-email-request.dto';

@Injectable()
export class EmailsService {
  constructor(private mailerService: MailerService) {}

  async createEmail(request: CreateEmailRequestDto): Promise<void> {
    try {
      console.log('')
      await this.mailerService.sendMail({
        to: request.recipients,
        from: process.env.EMAIL_FROM,
        bcc: request.recipients,
        subject: request.subject,
        template:'email-template',
        text: request.message,
      });
      console.log(`Email sent successfully to ${request.recipients}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email.');
    }
  }
}
