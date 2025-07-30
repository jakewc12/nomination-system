import React from 'react';
import {
  SampleForm,
  FormQuestionContainer,
  FormTextContainer,
  RadioButtons,
  FormQuestionText,
  FormDescriptionText,
} from '../../FormStyles';
import { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  Button,
  RadioGroup,
  FormHelperText,
  Radio,
} from '@mui/material';
import { SubFormProps } from './SubFormProps';

export const NominationSubForm: React.FC<SubFormProps> = ({
  formData,
  setFormData,
  updateErrors,
  errors,
  errorMessages,
  handleNext,
  handlePrev,
}) => {
  const [isNext, setIsNext] = useState(false);

  const handleReturningTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, returningSenatorType: value }));
    updateErrors('returningSenatorType', !value);
  };
  const handleAttestationChange = (value: string) => {
    setFormData((prev) => ({ ...prev, attestation: value }));
    updateErrors('attestation', !value);
  };

  return (
    <>
      <SampleForm>
        <FormControl>
          <FormTextContainer>
            <h2>SGA Senator Nomination Form</h2>
          </FormTextContainer>
        </FormControl>
        <FormControl error={isNext && errors.returningSenatorType}>
          <FormQuestionContainer>
            <FormTextContainer>
              <FormQuestionText>Are you a returning senator?</FormQuestionText>
              <FormDescriptionText>
                Select "yes" only if you have completed the Senator Education
                and Training Program (STEP) and remained a senator in good
                standing for at least one entire semester.
              </FormDescriptionText>
            </FormTextContainer>
            <RadioButtons>
              <RadioGroup
                name="returning-type-buttons-group"
                value={formData.returningSenatorType}
                onChange={(e) => handleReturningTypeChange(e.target.value)}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </RadioButtons>
          </FormQuestionContainer>
        </FormControl>
        <FormControl error={isNext && errors.attestation}>
          <FormQuestionContainer>
            <FormTextContainer>
              <FormQuestionText>
                Acknowledgment and Attestation
              </FormQuestionText>
              <FormDescriptionText>
                Please carefully read the following statement and select the
                button below if you agree: I attest that I am the undergraduate
                student in good academic and judicial standing listed on this
                form and that all information I am submitting is completely
                truthful and accurately presented; I authorize the Northeastern
                University Student Government Association to verify the
                information on this form, and I agree to abide by every
                responsibility and expectation of a senator, including attending
                weekly senate meetings and maintaining effective communication
                with my constituents.
              </FormDescriptionText>
            </FormTextContainer>
            <RadioButtons>
              <RadioGroup
                name="attestation-buttons-group"
                value={formData.attestation}
                onChange={(e) => handleAttestationChange(e.target.value)}
              >
                <FormControlLabel
                  value="agree"
                  control={<Radio />}
                  label="I have carefully read and fully agree to the statement above."
                />
                {isNext && errors.attestation && (
                  <FormHelperText>{errorMessages.attestation}</FormHelperText>
                )}
              </RadioGroup>
            </RadioButtons>
          </FormQuestionContainer>
        </FormControl>
      </SampleForm>
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          handlePrev();
        }}
      >
        Previous
      </Button>
    </>
  );
};
