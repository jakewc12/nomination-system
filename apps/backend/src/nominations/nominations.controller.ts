import { Body, Controller, Post, Get, Put, Param, BadRequestException, InternalServerErrorException } from '@nestjs/common';

import { NominationsService } from './nominations.service';
import { CreateNominationRequestDto } from './dto/create-nomination-request.dto';
import { UpdateNominationRequestDto } from './dto/update-nomination-request.dto';
import supabase from '../supabase/client';

@Controller('/nominations')
export class NominationsController {
  constructor(private readonly nominationsService: NominationsService) {}

  @Get()
  getNominations() {
    return this.nominationsService.getNominations();
  }

  @Get('/nuid/:nuid')
  async getNominationsByNuid(@Param('nuid') nuid: string) {
    console.log('nuid' + nuid)
    const result = await this.nominationsService.getNominationsByNuid(nuid);
    console.log('result', result)
    return result
  }

  @Get('/name/:name')
  async getNominationsByName(@Param('name') name: string) {
    console.log('name', name)
    return this.nominationsService.getNominationsByName(name);
  }

  

  // TODO change this endpoint to getNominationsById instead of email
  @Get('/email/:email')
  getNominationsByEmail(@Param('email') email: string) {
    console.log('email' + email)
    return this.nominationsService.getNominationsByEmail(email);
  }

  @Post()
  createNomination(@Body() request: CreateNominationRequestDto) {
    return this.nominationsService.createNomination(request);
  }

  @Put('/id/:id')
  updateNomination(
    @Param('id') id: number,
    @Body() request: UpdateNominationRequestDto
  ) {
    return this.nominationsService.updateNomination({
      id,
      ...request,
    });
  }

  @Get('/:unique-nominees')
  getUniqueNominees() {
    return this.nominationsService.getUniqueNominees()
  }

  @Get('/over/:votes')
  getNomineesOverVotes(@Param('votes') votes: number) {
    console.log('votes' + votes)
    return this.nominationsService.getNomineesWithVotes(votes);
  }
}
