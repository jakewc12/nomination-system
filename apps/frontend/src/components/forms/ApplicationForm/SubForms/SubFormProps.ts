import React from 'react';
import { ApplicationErrors } from '../ApplicationErrors';
import { ApplicationFormData } from '../ApplicationForm';

export interface SubFormProps {
  formData: ApplicationFormData;
  setFormData: React.Dispatch<React.SetStateAction<ApplicationFormData>>;
  updateErrors: (field: keyof ApplicationErrors, value: boolean) => void;
  errors: ApplicationErrors;
  errorMessages: Record<string, string>;
  handleNext: () => void;
  handlePrev: () => void;
}
