import React from 'react';
import {
  SampleForm,
  FormInput,
  FormQuestionContainer,
  FormTextContainer,
  FormTextAnswerContainer,
  RadioButtons,
  FormControls,
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
import {
  YEAR_OPTIONS,
  SENATOR_OPTIONS,
} from '../../../../../src/constants/constants';

export const AcademicsSubForm: React.FC<SubFormProps> = ({
  formData,
  setFormData,
  updateErrors,
  errors,
  errorMessages,
  handleNext,
  handlePrev,
}) => {
  const [isNext, setIsNext] = useState(false);

  const handleAcademicsNext = () => {
    setIsNext(true);
    if (
      !(errors.year || errors.college || errors.major || errors.constituency)
    ) {
      handleNext();
    }
  };

  const handleYearChange = (value: number) => {
    setFormData((prev) => ({ ...prev, year: value }));
    updateErrors('year', !value);
  };

  const handleCollegeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, college: value }));
    updateErrors('college', !value);
  };

  const handleMajorChange = (value: string) => {
    setFormData((prev) => ({ ...prev, major: value }));
    updateErrors('major', !value);
  };

  const handleMinorChange = (value: string) => {
    setFormData((prev) => ({ ...prev, minor: value }));
  };
  const handleConstituencyChange = (value: string) => {
    setFormData((prev) => ({ ...prev, constituency: value }));
    updateErrors('constituency', !value);
  };
  return (
    <>
      <SampleForm>
        <FormControl error={isNext && errors.year}>
          <FormQuestionContainer>
            <FormTextContainer>
              <FormQuestionText>What is your year?</FormQuestionText>
            </FormTextContainer>
            <RadioButtons>
              <RadioGroup
                name="year-buttons-group"
                value={formData.year?.toString()}
                onChange={(e) => {
                  handleYearChange(parseInt(e.target.value));
                }}
              >
                {YEAR_OPTIONS.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </RadioButtons>
            {isNext && errors.year && (
              <FormHelperText>{errorMessages.year}</FormHelperText>
            )}
          </FormQuestionContainer>
        </FormControl>
        <FormControl error={isNext && errors.college}>
          <FormQuestionContainer>
            <FormTextContainer>
              <FormQuestionText>What is your college?</FormQuestionText>
              <FormDescriptionText>
                For combined majors (a single major listed in the course catalog
                that spans two disciplines), list only the home college. For
                double majors (two distinct majors listed separately in the
                course catalog), include both colleges.
              </FormDescriptionText>
            </FormTextContainer>
            <FormTextAnswerContainer>
              <FormInput
                label="Required"
                required
                placeholder="College"
                value={formData.college}
                onChange={(e) => {
                  handleCollegeChange(e.target.value);
                }}
                error={isNext && !!errors.college}
                helperText={isNext && errors.college && errorMessages.college}
              />
            </FormTextAnswerContainer>
          </FormQuestionContainer>
        </FormControl>
        <FormControl error={isNext && errors.major}>
          <FormQuestionContainer>
            <FormTextContainer>
              <FormQuestionText>What is your major?</FormQuestionText>
            </FormTextContainer>
            <FormTextAnswerContainer>
              <FormInput
                label="Required"
                required
                placeholder="Major"
                value={formData.major}
                onChange={(e) => {
                  handleMajorChange(e.target.value);
                }}
                error={isNext && errors.major}
                helperText={isNext && errors.major && errorMessages.major}
              />
            </FormTextAnswerContainer>
          </FormQuestionContainer>
        </FormControl>
        <FormControl>
          <FormQuestionContainer>
            <FormTextContainer>
              <FormQuestionText>What are your minors?</FormQuestionText>
            </FormTextContainer>
            <FormTextAnswerContainer>
              <FormInput
                placeholder="Minors"
                value={formData.minor}
                onChange={(e) => {
                  handleMinorChange(e.target.value);
                }}
              />
            </FormTextAnswerContainer>
          </FormQuestionContainer>
        </FormControl>
        <FormControl error={isNext && !!errors.constituency}>
          <FormQuestionContainer>
            <FormTextContainer>
              <FormQuestionText>What is your constituency?</FormQuestionText>
              <FormDescriptionText>
                Academic senators represent an official Northeastern academic
                college or program. Example constituencies include the College
                of Engineering, the Global Scholars program, or the Honors
                program. Students in specialized entrance programs can only
                apply to become a senator representing a specialized entrance
                program as a constituency while actively enrolled in the
                program. For example, students can only apply to be NUin
                senators as first-semester students. Most senators are academic
                senators.
                <br />
                <br />
                Special interest senators are selected by the members and
                executive board of the organization they intend to represent.
                Example constituencies include Greek life organizations and
                clubs. More information about the difference between academic
                and special interest senators is available in the&nbsp;
                <a href="https://www.northeasternsga.com/become-a-senator">
                  frequently asked questions document
                </a>
                .
              </FormDescriptionText>
            </FormTextContainer>
            <RadioButtons>
              <RadioGroup
                name="constituency-buttons-group"
                value={formData.constituency}
                onChange={(e) => {
                  handleConstituencyChange(e.target.value);
                }}
              >
                {SENATOR_OPTIONS.map((option) => (
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
          {errors.constituency && isNext && (
            <FormHelperText>{errorMessages.constituency}</FormHelperText>
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
            handleAcademicsNext();
          }}
        >
          Next
        </Button>
      </FormControls>
    </>
  );
};
