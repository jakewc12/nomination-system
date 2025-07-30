import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import { FormHelperText } from '@mui/material';
import { getFullPath } from './../../../utils';
import {
  CONSTITUENCIES,
  GRADUATION_YEARS,
} from './../../../constants/constants';

import { NominationErrors, NominationErrorMessages } from './NominationErrors';

import {
  SampleForm,
  FormTextContainer,
  FormQuestionContainer,
  FormTextAnswerContainer,
  FormSelect,
  RadioButtons,
  Introduction,
  FormQuestionText,
  FormDescriptionText,
} from './../FormStyles';

interface Props {
  setIsPopupOpen: (open: boolean) => void;
  setErrorMessage: (message: string) => void;
  setErrorOpen: (open: boolean) => void;
}

export interface NominationFormData {
  fullName: string;
  email: string;
  nominee: string;
  constituency: string;
  college: string;
  major: string;
  graduationYear: number;
  receiveSenatorInfo: boolean;
  otherConstituency?: string;
}

const NominationForm: React.FC<Props> = ({
  setIsPopupOpen,
  setErrorMessage,
  setErrorOpen,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<NominationFormData>({
    fullName: '',
    email: '',
    nominee: '',
    constituency: '',
    college: '',
    major: '',
    graduationYear: 0,
    receiveSenatorInfo: false,
    otherConstituency: '',
  });

  /**
   * Update the form data state
   * @param field The field to be changed
   * @param value The value of the field to change
   */
  const updateFormData = <K extends keyof NominationFormData>(
    field: K,
    value: NominationFormData[K]
  ) => {
    if (typeof value === 'string' && value === '') {
      updateErrors(field as keyof NominationErrors, true);
    } else if (typeof value === 'number' && value === 0) {
      updateErrors(field as keyof NominationErrors, true);
    } else {
      updateErrors(field as keyof NominationErrors, false);
    }
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [nominationErrors, setNominationErrors] = useState<NominationErrors>({
    fullName: true,
    email: true,
    nominee: true,
    constituency: true,
    college: true,
    major: true,
    graduationYear: true,
    otherConstituency: false,
  });

  /**
   * Update the error state of a form field.
   * @param field The error key to be changed.
   * @param value The value to change it to.
   */
  const updateErrors = (field: keyof NominationErrors, value: boolean) => {
    setNominationErrors((prev) => {
      let updatedErrors = { ...prev, [field]: value };

      // Ensure otherConstituencyName is required if constituencyName is "Other"
      if (formData.constituency === 'Other' && !formData.otherConstituency) {
        updatedErrors.otherConstituency = true;
      } else {
        updatedErrors.otherConstituency = false;
      }

      return updatedErrors;
    });
  };

  /**
   * @returns Are there any errors in the form?
   */
  const hasAnyErrors = () => {
    if (formData.constituency === 'Other' && !formData.otherConstituency) {
      return true;
    }
    return Object.values(nominationErrors).some((value) => value === true);
  };

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [nomineeNames, setNomineeNames] = useState([]);

  const getNomineeData = (url: string) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const out = response.json();
        return out;
      })
      .then((data) => {
        setNomineeNames(data);
      })
      .catch((error) => {
        console.error('Error fetching:', error);
      });
  };
  useEffect(() => {
    getNomineeData(getFullPath('/api/nominations/unique-nominees'));
  });
  //getData(getFullPath('/api/nominations'), setNominations);

  const handleSampleFormSubmit = () => {
    setErrorOpen(false);
    setIsSubmitted(true);

    const finalConstituencyName =
      formData.constituency === 'Other' && formData.otherConstituency
        ? formData.otherConstituency
        : formData.constituency;

    const data = {
      ...formData,
      constituency: finalConstituencyName,
    };

    if (hasAnyErrors()) {
      return;
    }

    console.log('Form data:', data);

    delete data.otherConstituency;

    fetch(getFullPath('/api/nominations'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((data) => {
        if (data.ok) {
          navigate('/', { state: { formSubmissionSuccess: true, formName: 'Nomination' } }); 
        } else {
          data
            .json()
            .then((responseBody) => {
              // Extract and log the 'message' property from the response
              if (responseBody && responseBody.message) {
                setErrorMessage(responseBody.message);
                setErrorOpen(true);
              }
            })
            .catch((error) => {
              console.error('Error reading response body as JSON:', error);
              setErrorMessage('Error reading response body as JSON:' + error);
              setErrorOpen(true);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [nominationStarted, setNominationStarted] = useState(false);

  return (
    <>
      {!nominationStarted && (
        <>
          <SampleForm>
            <Introduction>
              <h2>SGA Senator Nomination Form</h2>
              <p>
                Complete this form to nominate a person to become a senator in
                the Student Government Association (SGA). SGA serves as the
                voice of the undergraduate student body and strives to promote
                student interests in the university and its surrounding
                communities. To learn more about SGA, visit our website at
                northeasternsga.com.
              </p>
              <p>
                This form is a nomination, not a vote. It is simply a statement
                you would like to see one of your peers become a senator in SGA.
                You may complete this form for an unlimited number of
                prospective senators, but you may only nominate each student
                once. You must belong to the same constituency as the
                prospective senator seeks to represent (so only undergraduate
                students in the College of Engineering may nominate senators for
                the College of Engineering, only NUin students may nominate
                senators for the NUin program, etc).
              </p>
              <p>
                SGA senator applications are currently open. To apply for a
                {/* TODO include valid url to senator applications form */}
                senatorship, visit{' '}
                <a href="http://localhost:4200/applications">
                  Senator Applications
                </a>
              </p>
              <p>
                Please contact Cassidy Donoghue at donoghue.ca@northeastern.edu
                with any questions.
              </p>
            </Introduction>
          </SampleForm>
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              setNominationStarted(true);
            }}
          >
            Start Nomination
          </Button>
        </>
      )}

      {nominationStarted && (
        <>
          <SampleForm>
            <FormControl
              required
              error={isSubmitted && nominationErrors.fullName}
            >
              <FormQuestionContainer>
                <FormTextContainer>
                  <FormQuestionText>What is your full name?</FormQuestionText>
                  <FormDescriptionText>
                    Please enter your first and last name as they appear in the
                    official university records.
                  </FormDescriptionText>
                </FormTextContainer>
                <FormTextAnswerContainer>
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue=""
                    onChange={(e) => {
                      updateFormData('fullName', e.target.value);
                    }}
                    error={isSubmitted && nominationErrors.fullName}
                    helperText={
                      isSubmitted &&
                      nominationErrors.fullName &&
                      NominationErrorMessages.fullName
                    }
                  />
                </FormTextAnswerContainer>
              </FormQuestionContainer>
            </FormControl>
          </SampleForm>
          <SampleForm>
            <FormControl required error={isSubmitted && nominationErrors.email}>
              <FormQuestionContainer>
                <FormTextContainer>
                  <FormQuestionText>
                    What is your Northeastern email?
                  </FormQuestionText>
                  <FormDescriptionText>
                    We may contact you to verify the authenticity of this
                    nomination.
                  </FormDescriptionText>
                </FormTextContainer>
                <FormTextAnswerContainer>
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    onChange={(e) => {
                      updateFormData('email', e.target.value);
                    }}
                    error={isSubmitted && nominationErrors.email}
                    helperText={
                      isSubmitted &&
                      nominationErrors.email &&
                      NominationErrorMessages.email
                    }
                  />
                </FormTextAnswerContainer>
              </FormQuestionContainer>
            </FormControl>
          </SampleForm>
          <SampleForm>
            <FormControl
              required
              error={isSubmitted && nominationErrors.nominee}
            >
              <FormQuestionContainer>
                <FormTextContainer>
                  <FormQuestionText>
                    Select the name of your nominee
                  </FormQuestionText>
                </FormTextContainer>
                <FormTextAnswerContainer>
                  <FormSelect
                    required
                    label="nominee"
                    onChange={(e) => {
                      updateFormData('nominee', e.target.value as string);
                    }}
                  >
                    {nomineeNames.map((name, index) => (
                      <MenuItem key={index} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </FormSelect>
                </FormTextAnswerContainer>
                {isSubmitted && nominationErrors.nominee && (
                  <FormHelperText>
                    {NominationErrorMessages.nominee}
                  </FormHelperText>
                )}
              </FormQuestionContainer>
            </FormControl>
          </SampleForm>
          <SampleForm>
            <FormControl
              required
              error={isSubmitted && nominationErrors.constituency}
            >
              <FormQuestionContainer>
                <FormTextContainer>
                  <FormQuestionText>
                    Select a college, organization, or program from the list
                    below to confirm you are one of the prospective senator's
                    constituents.
                  </FormQuestionText>{' '}
                  <FormDescriptionText>
                    {' '}
                    Select the name of the person you are nominating. You must
                    select the same constituency as the prospective senator for
                    this nomination to be processed. Please confirm you are one
                    of the prospective senator's constituents.
                  </FormDescriptionText>
                </FormTextContainer>
                <FormTextAnswerContainer>
                  <FormSelect
                    required
                    onChange={(e) => {
                      updateFormData('constituency', e.target.value as string);
                    }}
                  >
                    {CONSTITUENCIES.map((constituency) => (
                      <MenuItem key={constituency} value={constituency}>
                        {constituency}
                      </MenuItem>
                    ))}
                  </FormSelect>
                </FormTextAnswerContainer>
                {isSubmitted && nominationErrors.constituency && (
                  <FormHelperText>
                    {NominationErrorMessages.constituency}
                  </FormHelperText>
                )}
              </FormQuestionContainer>
            </FormControl>
          </SampleForm>
          {/* Show text field if "Other" is selected */}
          {formData.constituency === 'Other' && (
            <SampleForm>
              <FormControl
                required
                error={isSubmitted && !!nominationErrors.otherConstituency}
              >
                <FormQuestionContainer>
                  <FormQuestionText>
                    Please specify the constituency
                  </FormQuestionText>{' '}
                  <br></br>
                  <FormTextAnswerContainer>
                    <TextField
                      required
                      id="outlined-required"
                      defaultValue=""
                      onChange={(e) => {
                        updateFormData(
                          'otherConstituency',
                          e.target.value as string
                        );
                      }}
                    />
                  </FormTextAnswerContainer>
                  {isSubmitted && nominationErrors.otherConstituency && (
                    <FormHelperText>
                      {NominationErrorMessages.otherConstituency}
                    </FormHelperText>
                  )}
                </FormQuestionContainer>
              </FormControl>
            </SampleForm>
          )}
          <SampleForm>
            <FormControl
              required
              error={isSubmitted && nominationErrors.college}
            >
              <FormQuestionContainer>
                <FormTextContainer>
                  <FormQuestionText>What is your college?</FormQuestionText>
                  <FormDescriptionText>
                    Note: For combined majors (a single major listed in the
                    course catalog that spans two disciplines), list only the
                    home college. For double majors (two distinct majors listed
                    separately in the course catalog), include both colleges.
                  </FormDescriptionText>
                </FormTextContainer>
                <FormTextAnswerContainer>
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    onChange={(e) => {
                      updateFormData('college', e.target.value);
                    }}
                    error={isSubmitted && nominationErrors.college}
                    helperText={
                      isSubmitted &&
                      nominationErrors.college &&
                      NominationErrorMessages.college
                    }
                  />
                </FormTextAnswerContainer>
              </FormQuestionContainer>
            </FormControl>
          </SampleForm>
          <SampleForm>
            <FormControl required error={isSubmitted && nominationErrors.major}>
              <FormQuestionContainer>
                <FormTextContainer>
                  <FormQuestionText>What is your major?</FormQuestionText>
                </FormTextContainer>
                <FormTextAnswerContainer>
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    onChange={(e) => {
                      updateFormData('major', e.target.value);
                    }}
                    error={isSubmitted && nominationErrors.major}
                    helperText={
                      isSubmitted &&
                      nominationErrors.major &&
                      NominationErrorMessages.major
                    }
                  />
                </FormTextAnswerContainer>
              </FormQuestionContainer>
            </FormControl>
          </SampleForm>
          <SampleForm>
            <FormControl error={isSubmitted && nominationErrors.graduationYear}>
              <FormQuestionContainer>
                <FormTextContainer>
                  <FormQuestionText>
                    What is your expected graduation year?
                  </FormQuestionText>
                </FormTextContainer>
                <RadioButtons>
                  <RadioGroup
                    name="year-buttons-group"
                    aria-required
                    onChange={(e) => {
                      updateFormData(
                        'graduationYear',
                        Number.parseInt(e.target.value)
                      );
                    }}
                  >
                    {GRADUATION_YEARS.map((year) => (
                      <FormControlLabel
                        key={year}
                        value={year}
                        control={<Radio />}
                        label={year.toString()}
                      />
                    ))}
                  </RadioGroup>
                </RadioButtons>
                {isSubmitted && nominationErrors.graduationYear && (
                  <FormHelperText>
                    {NominationErrorMessages.graduationYear}
                  </FormHelperText>
                )}
              </FormQuestionContainer>
            </FormControl>
          </SampleForm>
          <SampleForm>
            <FormQuestionContainer>
              <FormTextContainer>
                <FormQuestionText>
                  Would you like to receive information about how to become a
                  senator?
                </FormQuestionText>
                <FormDescriptionText>
                  Becoming a senator is an excellent, rewarding opportunity to
                  serve and improve the Northeastern community.
                </FormDescriptionText>
              </FormTextContainer>
              <RadioButtons>
                <RadioGroup
                  aria-required
                  value={formData.receiveSenatorInfo ? 'Yes' : 'No'}
                  name="receive-buttons-group"
                  onChange={(e) =>
                    updateFormData(
                      'receiveSenatorInfo',
                      e.target.value === 'Yes'
                    )
                  }
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </RadioButtons>
            </FormQuestionContainer>
          </SampleForm>
          <Button variant="contained" onClick={handleSampleFormSubmit}>
            Submit
          </Button>{' '}
        </>
      )}
    </>
  );
};

export default NominationForm;
