import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateApplicationRequestDto } from './dto/update-application-request.dto';
import { GetNominationFormDTO } from './dto/get-nomination-forms-request.dto';

import supabase from '../supabase/client';
import { Tables } from '../supabase/database.types';
import { CreateApplicationRequestDto } from './dto/create-application-request.dto';
import { validateOrReject, ValidationError } from 'class-validator';

import { NominationsService} from '../nominations/nominations.service';

@Injectable()
export class ApplicationsService {
  constructor(private readonly nominationsService: NominationsService) {
  }

  async getApplications(): Promise<Tables<'applications'>[]> {
    const { data, error } =
      await supabase.from('applications').select('*');

    if (error) {
      throw new InternalServerErrorException(`Failed to fetch applications: ${error.message}`);
    }

    return data;
  }

  async getNominationForms(): Promise<GetNominationFormDTO> {
    const { data: nominees, error: nomineesError } = await supabase
    .from('applications')
    .select('fullName, email');
    const { data: constituencies, error: constituencyError } = await supabase
    .from('applications')
    .select('constituency');

    if (nomineesError || constituencyError) {
      throw new InternalServerErrorException([
        nomineesError ? `Nominee data fetch failed: ${nomineesError.message}` : '',
        constituencyError ? `Constituency data fetch failed: ${constituencyError.message}` : '',
      ].filter(Boolean).join(' | '));
    }

    return {
      nominees: nominees,
      constituencies: [
        ...new Set(constituencies.map((item) => item.constituency)),
      ],
    };
  }

  /**
   * Creates an application on supabase sql table
   * @param applicationColumns are the columns returned by the application request dto
   */
  async createApplication(applicationColumns: CreateApplicationRequestDto): Promise<void> {
    await this.validateApplication(applicationColumns);
    await this.handleApplication(applicationColumns);
  }

  private async validateApplication(applicationColumns: CreateApplicationRequestDto): Promise<void> {
    try {
      await validateOrReject(applicationColumns);
      console.log('columns', applicationColumns);
    } catch (errors) {
      console.log("Validation failed");
      throw new BadRequestException(this.formatValidationErrors(errors));
    }
  }

  private async handleApplication(applicationColumns: CreateApplicationRequestDto): Promise<void> {
    const nuid = applicationColumns.nuid;
    const existingApplications = await this.findDuplicateApplications(nuid);

    if (existingApplications.length > 0) {
      // if application already exists
      await this.updateApplicationNUID(applicationColumns);
    } else {
      // new applications
      await this.insertApplication(applicationColumns);
    }
  }

  // insert application in sql
  private async insertApplication(applicationColumns: CreateApplicationRequestDto): Promise<void> {
    const { error } = await supabase.from('applications').insert(applicationColumns);

    if (error) {
      throw new BadRequestException(`Failed to create application: ${error.message}`);
    }
  }

  // update existing application
  private async updateApplicationNUID(applicationColumns: CreateApplicationRequestDto): Promise<void> {
    const { error } = await supabase
    .from('applications')
    .update(applicationColumns)
    .eq('nuid', applicationColumns.nuid);

    // delete all nominations associated with the current application IF updated

    await this.nominationsService.deleteAllNominationsFor(applicationColumns.fullName);

    if (error) {
      throw new BadRequestException(`Failed to update application: ${error.message}`);
    }
  }

  // check for duplicate applications by nuid
  private async findDuplicateApplications(nuid: string): Promise<{ nuid: string }[]> {
    const { data, error } = await supabase
    .from('applications')
    .select('nuid')
    .eq('nuid', nuid);

    if (error) {
      throw new BadRequestException(`Failed to check for duplicate applications: ${error.message}`);
    }

    return data ?? [];
  }


  private formatValidationErrors(errors: ValidationError[]): string {
    return errors
    .map((err) => `${err.property}: ${Object.values(err.constraints).join(', ')}`)
    .join('; ');
  }

  async updateApplication({
                            id,
                            ...applicationColumns
                          }: {
    id: number;
  } & UpdateApplicationRequestDto): Promise<void> {
    // unused?
    const { data: applicationData } = await supabase
    .from('applications')
    .select('*')
    .eq('id', id);

    if (applicationData.length === 0) {
      throw new NotFoundException(
        `Application with given id, ${id}, does not exist.`
      );
    }

    const { error } = await supabase
    .from('applications')
    .update(applicationColumns)
    .eq('id', id);

    if (error) {
      throw new InternalServerErrorException(`Failed to update application: ${error.message}`);
    }
  }
}
