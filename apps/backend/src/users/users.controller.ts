import { Body, Controller, Get, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/create-user-request.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUser() {
    return this.usersService.getUsers();
  }

  @Post()
  createUser(@Body() request: CreateUserRequestDto) {
    return this.usersService.createUser(request);
  }
}
