import React from 'react';
import {
  SampleForm,
  FormQuestionContainer,
  FormTextContainer,
  FormInputCheckbox,
  FormControls,
  FormQuestionText,
} from '../../FormStyles';
import {
  FormControl,
  Button,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from '@mui/material';
import { SubFormProps } from './SubFormProps';
import { useState } from 'react';
import { PRONOUNS } from '../../../../../src/constants/constants';

export const PronounSubForm: React.FC<SubFormProps> = ({
  formData,
  setFormData,
  updateErrors,
  errors,
  errorMessages,
  handleNext,
  handlePrev,
}) => {
  const [isNext, setIsNext] = useState(false);

  const handlePronounNext = () => {
    setIsNext(true);
    if (!errors.pronouns) {
      handleNext();
    }
  };

  const handlePronounChange = (event: React.SyntheticEvent) => {
    const { value } = event.currentTarget;

    setFormData((prev) => {
      const isAlreadySelected = prev.pronouns.includes(value);
      const updatedPronouns = isAlreadySelected
        ? prev.pronouns.filter((pronoun) => pronoun !== value)
        : [...prev.pronouns, value];

      updateErrors('pronouns', updatedPronouns.length === 0);

      return { ...prev, pronouns: updatedPronouns };
    });
  };
  return (
    <>
      <SampleForm>
        <FormControl error={isNext && errors.pronouns}>
          <FormQuestionContainer>
            <FormTextContainer>
              <FormQuestionContainer>
                <FormQuestionText>What pronouns do you use?</FormQuestionText>
              </FormQuestionContainer>
            </FormTextContainer>
            <FormInputCheckbox>
              {PRONOUNS.map((option) => (
                <FormControlLabel
                  key={option}
                  required
                  control={<Checkbox />}
                  onChange={handlePronounChange}
                  label={option}
                  value={option}
                  checked={formData.pronouns.includes(option)}
                />
              ))}
            </FormInputCheckbox>
          </FormQuestionContainer>
          {errors.pronouns && isNext && (
            <FormHelperText>{errorMessages.pronouns}</FormHelperText>
          )}
        </FormControl>
      </SampleForm>
      <FormControls>
        <Button
          variant="contained"
          sx={{ width: '45%' }}
          size="large"
          onClick={() => {
            handlePrev();
          }}
        >
          Previous
        </Button>
        <Button
          sx={{ width: '45%' }}
          size="large"
          variant="contained"
          onClick={() => {
            handlePronounNext();
          }}
        >
          Next
        </Button>
      </FormControls>
    </>
  );
};
