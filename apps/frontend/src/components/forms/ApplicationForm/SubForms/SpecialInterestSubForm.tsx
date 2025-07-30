import React from 'react';
import {
  SampleForm,
  FormSelect,
  FormInput,
  FormQuestionContainer,
  FormTextContainer,
  FormTextAnswerContainer,
  RadioButtons,
  FormControls,
  FormQuestionText,
  FormDescriptionText,
} from '../../FormStyles';
import {
  FormControl,
  FormControlLabel,
  Button,
  MenuItem,
  RadioGroup,
  FormHelperText,
  Radio,
} from '@mui/material';
import { SubFormProps } from './SubFormProps';
import { useState } from 'react';
import {
  CONSTITUENCY_TYPES,
  CONSTITUENCIES,
} from '../../../../../src/constants/constants';

export const SpecialInterestSubForm: React.FC<SubFormProps> = ({
  formData,
  setFormData,
  updateErrors,
  errors,
  errorMessages,
  handleNext,
  handlePrev,
}) => {
  const [isNext, setIsNext] = useState(false);

  const handleSpecialInterestNext = () => {
    setIsNext(true);
    if (!(errors.constituencyType || errors.constituencyName)) {
      handleNext();
    }
  };

  const handleConstituencyTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, constituencyType: value }));
    updateErrors('constituencyType', !value);
  };
  const handleConstituencyNameChange = (value: string) => {
    setFormData((prev) => ({ ...prev, constituencyName: value }));
    updateErrors('constituencyName', !value);
  };
  const handleOtherConstituencyNameChange = (value: string) => {
    setFormData((prev) => ({ ...prev, otherConstituencyName: value }));
    updateErrors('otherConstituencyName', !value);
  };

  return (
    <>
      <SampleForm>
        <FormControl>
          <FormTextContainer>
            <h2>Special Interest Senator Constituency Information</h2>
            <FormDescriptionText>
              Note: Special interest senators applying from a student
              organization with less than 30 members must submit a paper
              nomination. Paper applications are available to pick up at the SGA
              office, 332 Curry.
            </FormDescriptionText>
          </FormTextContainer>
        </FormControl>
        <FormControl error={isNext && errors.constituencyType}>
          <FormQuestionContainer>
            <FormTextContainer>
              <FormQuestionText>
                What type of constituency would you like to represent?
              </FormQuestionText>
            </FormTextContainer>
            <RadioButtons>
              <RadioGroup
                name="constituency-type-buttons-group"
                value={formData.constituencyType}
                onChange={(e) => {
                  handleConstituencyTypeChange(e.target.value);
                }}
              >
                {CONSTITUENCY_TYPES.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </RadioButtons>
          </FormQuestionContainer>
          {errors.constituencyType && isNext && (
            <FormHelperText>{errorMessages.constituencyType}</FormHelperText>
          )}
        </FormControl>

        <FormControl required error={isNext && errors.constituencyName}>
          <FormQuestionContainer>
            <FormTextContainer>
              <FormQuestionText>
                Select a college, organization, or program from the list below
                of the name of your constituency
              </FormQuestionText>
              <FormDescriptionText>
                Only recognized student organizations may have a special
                interest senator.
              </FormDescriptionText>
            </FormTextContainer>
            <FormTextAnswerContainer>
              <FormSelect
                required
                value={formData.constituencyName}
                onChange={(e) => {
                  handleConstituencyNameChange(e.target.value as string);
                }}
              >
                {CONSTITUENCIES.map((constituency) => (
                  <MenuItem key={constituency} value={constituency}>
                    {constituency}
                  </MenuItem>
                ))}
              </FormSelect>
            </FormTextAnswerContainer>
            {isNext && errors.constituencyName && (
              <FormHelperText>{errorMessages.constituencyName}</FormHelperText>
            )}
          </FormQuestionContainer>
        </FormControl>

        {/* Show text field if "Other" is selected */}
        {formData.constituencyName === 'Other' && (
          <FormControl
            required
            error={isNext && errors.otherConstituencyName}
            sx={{ marginTop: 2 }}
          >
            <FormQuestionText>
              Please specify your constituency
            </FormQuestionText>
            <br></br>
            <FormTextAnswerContainer>
              <FormInput
                type="text"
                value={formData.otherConstituencyName || ''}
                onChange={(e) =>
                  handleOtherConstituencyNameChange(e.target.value)
                }
              />
            </FormTextAnswerContainer>
            {isNext && errors.otherConstituencyName && (
              <FormHelperText>
                {errorMessages.otherConstituencyName}
              </FormHelperText>
            )}
          </FormControl>
        )}
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
            handleSpecialInterestNext();
          }}
        >
          Next
        </Button>
      </FormControls>
    </>
  );
};
