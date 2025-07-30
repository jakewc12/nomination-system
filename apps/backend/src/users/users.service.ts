import { Injectable } from '@nestjs/common';

import supabase from '../supabase/client';
import { Tables } from '../supabase/database.types';
import { CreateUserRequestDto } from './dto/create-user-request.dto';

@Injectable()
export class UsersService {
  async getUsers(): Promise<Tables<'users'>[]> {
    const { data, error } = await supabase.from('users').select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async createUser(userColumns: CreateUserRequestDto): Promise<void> {
    const { error } = await supabase.from('users').insert(userColumns);

    if (error) {
      throw new Error(error.message);
    }
  }
}
