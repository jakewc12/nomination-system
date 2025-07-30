import React from 'react';
import {
  SampleForm,
  FormInput,
  FormQuestionContainer,
  FormTextContainer,
  FormTextAnswerContainer,
  FormQuestionText,
  FormDescriptionText,
  FormControls,
} from '../../FormStyles';
import { FormControl, Button } from '@mui/material';
import { SubFormProps } from './SubFormProps';
import { useState } from 'react';

export const PersonalInfoSubForm: React.FC<SubFormProps> = ({
  formData,
  setFormData,
  updateErrors,
  errors,
  errorMessages,
  handleNext,
  handlePrev,
}) => {
  const [isNext, setIsNext] = useState(false);

  const handlePersonalInfoNext = () => {
    setIsNext(true);
    if (!(errors.nuid || errors.email || errors.phoneNumber)) {
      handleNext();
    }
  };

  const handleNUIDChange = (value: string) => {
    setFormData((prev) => ({ ...prev, nuid: value }));
    updateErrors('nuid', !value);
  };

  const handleEmailChange = (value: string) => {
    setFormData((prev) => ({ ...prev, email: value }));
    updateErrors('email', !value);
  };

  const handlePhoneNumberChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phoneNumber: value }));
    updateErrors('phoneNumber', !value);
  };
  return (
    <>
      <SampleForm>
        <FormControl error={isNext && errors.nuid}>
          <FormQuestionContainer>
            <FormTextContainer>
              <FormQuestionText>What is your NUID?</FormQuestionText>
            </FormTextContainer>
            <FormTextAnswerContainer>
              <FormInput
                label="Required"
                required
                placeholder="NUID"
                value={formData.nuid}
                onChange={(e) => {
                  handleNUIDChange(e.target.value);
                }}
                error={isNext && errors.nuid}
                helperText={
                  isNext && errors.nuid && errorMessages.northeasternID
                }
              />
              <br />
            </FormTextAnswerContainer>
          </FormQuestionContainer>
        </FormControl>
        <FormControl error={isNext && errors.email}>
          <FormQuestionContainer>
            <FormTextContainer>
              <FormQuestionText>
                What is your Northeastern email?
              </FormQuestionText>
              <br />
              <FormDescriptionText>
                All email communications will be sent to this address.
              </FormDescriptionText>
            </FormTextContainer>
            <FormTextAnswerContainer>
              <FormInput
                label="Required"
                required
                placeholder="Email"
                value={formData.email}
                onChange={(e) => {
                  handleEmailChange(e.target.value);
                }}
                error={isNext && errors.email}
                helperText={isNext && errors.email && errorMessages.email}
              />
            </FormTextAnswerContainer>
          </FormQuestionContainer>
        </FormControl>
        <FormControl error={isNext && errors.phoneNumber}>
          <FormQuestionContainer>
            <FormTextContainer>
              <FormQuestionText>What is your phone number?</FormQuestionText>
              <br />
              <FormDescriptionText>
                Please enter your cell phone number. If you do not have a phone
                that can receive calls and texts in the United States, note so
                here. Make sure to include the country code if your phone number
                has a country code other than 1 (most North American countries
                and islands).
              </FormDescriptionText>
            </FormTextContainer>
            <FormTextAnswerContainer>
              <FormInput
                label="Required"
                required
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => {
                  handlePhoneNumberChange(e.target.value);
                }}
                error={isNext && errors.phoneNumber}
                helperText={
                  isNext && errors.phoneNumber && errorMessages.phoneNumber
                }
              />
            </FormTextAnswerContainer>
          </FormQuestionContainer>
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
            handlePersonalInfoNext();
          }}
        >
          Next
        </Button>
      </FormControls>
    </>
  );
};
