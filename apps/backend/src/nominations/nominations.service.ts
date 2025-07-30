import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateNominationRequestDto } from './dto/create-nomination-request.dto';
import { UpdateNominationRequestDto } from './dto/update-nomination-request.dto';

import supabase from '../supabase/client';
import { Tables } from '../supabase/database.types';
import { Status } from './nominations.types';
import { validateOrReject, ValidationError } from 'class-validator';

interface NomineeData {
  constituencyName: string;
}

@Injectable()
export class NominationsService {
  async getNominations(): Promise<Tables<'nominations'>[]> {
    const { data, error } = await supabase.from('nominations').select('*');

    if (error) {
      throw new InternalServerErrorException(
        `Failed to fetch nominations: ${error.message}`
      );
    }

    return data;
  }

  async getNominationsByName(name: string): Promise<number> {
    console.log('name:' + name);
    const { count, error } = await supabase
      .from('nominations')
      .select('*', { count: 'exact' })
      .eq('nominee', name)
      .eq('status', Status.APPROVED);
    console.log('count', count);
    console.log('error', error);
    if (error) {
      throw new InternalServerErrorException(
        `Failed to fetch nominations for ${name}: ${error.message}`
      );
    }

    return count;
  }

  private async getNameByNuid(nuid: string): Promise<string> {
    const { data, error } = await supabase
      .from('applications')
      .select('fullName')
      .eq('nuid', nuid)
      .single();

    console.log('error', error);
    if (error || !data) {
      throw new NotFoundException(`No application found for NUID ${nuid}`);
    }

    return data.fullName;
  }

  async getNominationsByNuid(nuid: string): Promise<number> {
    console.log('nuid' + nuid);
    const name = await this.getNameByNuid(nuid);
    const count = await this.getNominationsByName(name);
    console.log('final count', count);
    return count;
  }

  async getNominationsByEmail(email: string): Promise<Tables<'nominations'>[]> {
    const { data, error } = await supabase
      .from('nominations')
      .select('*')
      .eq('email', email);

    if (error) {
      throw new InternalServerErrorException(
        `Failed to fetch nominations: ${error.message}`
      );
    }

    if (data.length === 0) {
      throw new BadRequestException(
        `Nominations with given email, ${email}, do not exist.`
      );
    }

    return data;
  }

  async createNomination({
    ...nominationsColumns
  }: CreateNominationRequestDto): Promise<void> {
    try {
      console.log('here');
      await validateOrReject(nominationsColumns);
    } catch (errors) {
      console.log(errors);
      throw new BadRequestException(this.formatValidationErrors(errors));
    }

    if (nominationsColumns.fullName === nominationsColumns.nominee) {
      throw new BadRequestException(
        'You cannot nominate yourself for Senator.'
      );
    }

    // **Constituency Validation**: New helper function call
    await this.validateConstituency(
      nominationsColumns.nominee,
      nominationsColumns.constituency
    );

    console.log('hereee');
    let status = Status.APPROVED;
    const { data: nominationData } = await supabase
      .from('nominations')
      .select('*')
      .eq('email', nominationsColumns.email);

    // Has this nominator already nominated this nominee?
    const valid = nominationData.every(
      (nomination) => nomination.nominee !== nominationsColumns.nominee
    );
    if (!valid) {
      status = Status.DENIED;
      console.log('what');
      throw new BadRequestException(
        `This nominator has already nominated the nominee: ${nominationsColumns.nominee}.`
      );
    }

    const { error } = await supabase.from('nominations').insert({
      ...nominationsColumns,
      status,
    });

    if (error) {
      throw new BadRequestException(
        `Failed to create nomination: ${error.message}`
      );
    }
  }

  private async validateConstituency(
    nominee: string,
    constituency: string
  ): Promise<void> {
    const { data: nomineeData, error: nomineeError } = await supabase
      .from('applications') // this is the name of the table right??
      .select('constituencyName')
      .eq('fullName', nominee)
      .single<{ constituencyName: string }>();

    if (nomineeError || !nomineeData) {
      console.log('error', nomineeError);
      throw new NotFoundException(`Nominee ${nominee} not found.`);
    }
    console.log(nomineeData);
    if (nomineeData.constituencyName !== constituency) {
      console.log(nomineeData.constituencyName);
      console.log(constituency);
      console.log(nomineeData.constituencyName !== constituency);
      throw new BadRequestException(
        `The nominator must belong to the same constituency as the nominee.`
      );
    }
  }

  private formatValidationErrors(errors: ValidationError[]): string {
    return errors
      .map(
        (err) => `${err.property}: ${Object.values(err.constraints).join(', ')}`
      )
      .join('; ');
  }

  async updateNomination({
    id,
    ...nominationColumns
  }: {
    id: number;
  } & UpdateNominationRequestDto): Promise<void> {
    const { data: nominationData } = await supabase
      .from('nominations')
      .select('*')
      .eq('id', id);

    if (nominationData.length === 0) {
      throw new NotFoundException(
        `Nominations with given id, ${id}, does not exist.`
      );
    }

    const { error } = await supabase
      .from('nominations')
      .update({
        ...nominationColumns,
      })
      .eq('id', id);

    if (error) {
      throw new InternalServerErrorException(
        `Failed to update nomination: ${error.message}`
      );
    }
  }
  async getUniqueNominees() {
    const { data: applicants, error } = await supabase
      .from('applications')
      .select('id, fullName')
      .order('id', { ascending: false });

    if (error) {
      throw new InternalServerErrorException(
        'Error fetching nominees: ' + error.message
      );
    }

    const uniqueNominees = new Map<string, { id: number; fullName: string }>();

    for (const applicant of applicants) {
      if (!uniqueNominees.has(applicant.fullName)) {
        uniqueNominees.set(applicant.fullName, applicant);
      }
    }

    return Array.from(uniqueNominees.values()).map(
      (applicant) => applicant.fullName
    );
  }

  /**
   * delete all nominations based on the name of the nominee
   * @param nominee name
   */
  async deleteAllNominationsFor(nominee: string): Promise<void> {
    Logger.log('deleted nominations associated with updated applicant');
    const { error } = await supabase
      .from('nominations')
      .delete()
      .eq('nominee', nominee);
    if (error) {
      throw new InternalServerErrorException(
        `Failed to delete nominations: ${error.message}`
      );
    }
  }

  async getNomineesWithVotes(votes: number) {
    // Step 1: Fetch nominee counts and constituency
    const { data, error } = await supabase
      .from('nominations')
      .select('nominee, constituency');
    if (error) {
      throw new InternalServerErrorException(
        `Failed to fetch nominations: ${error.message}`
      );
    }
    if (!data || data.length === 0) {
      console.log('No data found');
      return [];
    }
    // Step 2: Count occurrences of each nominee
    const nomineeCounts: Record<
      string,
      { count: number; constituency: string }
    > = {};
    data.forEach(({ nominee, constituency }) => {
      if (!nomineeCounts[nominee]) {
        nomineeCounts[nominee] = { count: 0, constituency };
      }
      nomineeCounts[nominee].count += 1;
    });
    // Step 3: Filter nominees with votes greater than the threshold and sort results
    const finalResult = Object.entries(nomineeCounts)
      .filter(([_, { count }]) => count >= votes)
      .map(([nominee, { count, constituency }]) => ({
        nominee,
        constituency,
        count,
      }))
      .sort((a, b) => b.count - a.count); // Sort by highest to lowest count
    console.log(finalResult);
    return finalResult;
  }
}
