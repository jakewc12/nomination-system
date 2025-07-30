import { Body, Controller, Post, Get, Put, Param } from '@nestjs/common';

import { ApplicationsService } from './applications.service';
import { CreateApplicationRequestDto } from './dto/create-application-request.dto';
import { UpdateApplicationRequestDto } from './dto/update-application-request.dto';

@Controller('/applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get()
  getApplications() {
    return this.applicationsService.getApplications();
  }

  @Get('/nomination-forms')
  getNominationForms() {
    return this.applicationsService.getNominationForms();
  }

  @Post()
  createApplication(@Body() request: CreateApplicationRequestDto) {
    console.log(request)
    return this.applicationsService.createApplication(request);
  }

  @Put('/:id')
  updateApplication(
    @Param('id') id: number,
    @Body() request: UpdateApplicationRequestDto
  ) {
    return this.applicationsService.updateApplication({
      id,
      ...request,
    });
  }
}
