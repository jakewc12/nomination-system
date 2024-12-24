import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { ApplicationsModule } from '../applications/applications.module';
import { NominationsModule } from '../nominations/nominations.module';

@Module({
  imports: [UsersModule, ApplicationsModule, NominationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
