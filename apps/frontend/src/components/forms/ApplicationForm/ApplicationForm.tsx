import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import { FormHelperText } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';


import { getFullPath } from './../../../utils';

import {
  FormInput,
  SampleForm,
  FormTextContainer,
  FormQuestionContainer,
  FormTextAnswerContainer,
  Introduction,
  FormSelect,
  FormInputCheckbox,
  RadioButtons,
} from './styles';

interface Props {
  setIsPopupOpen: (open: boolean) => void;
  setErrorMessage: (message: string) => void;
  setErrorOpen: (open: boolean) => void;
}

const ApplicationForm: React.FC<Props> = ({
  setIsPopupOpen,
  setErrorMessage,
  setErrorOpen,
}) => {
  const [fullName, setFullName] = useState<string>('');
  const [preferredFullName, setPreferredFullName] = useState<string>('');
  const [phoneticPronunciation, setPhoneticPronunciation] =
    useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [northeasternID, setNortheasternID] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [college, setCollege] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [minors, setMinors] = useState<string>('');
  const [constituencyName, setConstituencyName] = useState<string>('');

  const [year, setYear] = useState<number>();
  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setYear(value);
    if (errors.year) {
      errors.year = '';
    }
  };

  const [constituency, setConstituency] = useState<string>('academic');
  const handleConstituencyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConstituency(event.target.value);
    if (errors.constituency) {
      errors.constituency = '';
    }
  };

  const [constituencyType, setConstituencyType] = useState<string>('club');
  const handleConstituencyTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConstituencyType(event.target.value);
    if (errors.selectedConstituencyType) {
      errors.selectedConstituencyType = '';
    }
  };

  const [returningSenatorType, setReturningSenatorType] =
    useState<string>('no');
  const handleReturningTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReturningSenatorType(event.target.value);
  };

  const [attestation, setAttestation] = useState<string>();
  const handleAttestationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAttestation(event.target.value);
    if (errors.selectedAttestation) {
      errors.selectedAttestation = '';
    }
  };

  const [pronouns, setPronouns] = useState<string[]>([]);
  const handleCheckboxChange = (event: React.SyntheticEvent) => {
    const { value } = event.currentTarget;
    if (pronouns.includes(value)) {
      setPronouns(pronouns.filter((pronoun) => pronoun !== value));
    } else {
      setPronouns([...pronouns, value]);
    }
  };

  const [errors, setErrors] = useState<{
    fullName?: string;
    preferredFullName?: string;
    phoneticPronunciation?: string;
    nickname?: string;
    northeasternID?: string;
    email?: string;
    phoneNumber?: string;
    college?: string;
    major?: string;
    minors?: string;
    constituencyName?: string;
    year?: string;
    constituency?: string;
    selectedConstituencyType?: string;
    selectedReturningType?: string;
    selectedAttestation?: string;
    pronouns?: string;
  }>({});

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const isTextFieldError = fullName === '';
  const isPreferredFullNameError = preferredFullName === '';
  const isPhoneticPronunciationError = phoneticPronunciation === '';
  const isNicknameError = nickname === '';
  const isNortheasternIDError = northeasternID === '';
  const isEmailError = email === '';
  const isPhoneNumberError = phoneNumber === '';
  const isCollegeError = college === '';
  const isMajorError = major === '';
  const isMinorError = minors === '';
  const isconstituencyNameError = constituencyName === '';
  const isYearError = year == null || year < 0;
  const isConstituencyError = constituency == null;
  const isConstituencyTypeError = constituencyType == null;
  const isReturningSenatorError = returningSenatorType == null;
  const isAttestationError = attestation !== 'agree';

  const submitApplication = () => {
    setErrorOpen(false);
    setIsSubmitted(true);
    if (
      isTextFieldError ||
      isPreferredFullNameError ||
      isPhoneticPronunciationError ||
      isNicknameError ||
      isNortheasternIDError ||
      isEmailError ||
      isPhoneNumberError ||
      isCollegeError ||
      isMinorError ||
      isMajorError ||
      isconstituencyNameError ||
      isYearError ||
      isConstituencyError ||
      isConstituencyTypeError ||
      isReturningSenatorError ||
      isAttestationError
    ) {
      // TODO show error popup with message

      const newErrors: {
        fullName?: string;
        preferredFullName?: string;
        phoneticPronunciation?: string;
        nickname?: string;
        northeasternID?: string;
        email?: string;
        phoneNumber?: string;
        college?: string;
        major?: string;
        minors?: string;
        constituencyName?: string;
        year?: string;
        constituency?: string;
        selectedConstituencyType?: string;
        selectedReturningType?: string;
        selectedAttestation?: string;
        pronouns?: string;
      } = {};
      if (isTextFieldError) newErrors.fullName = 'Name is mandatory';
      if (isPreferredFullNameError)
        newErrors.preferredFullName = 'Preferred Name is mandatory';
      if (isPhoneticPronunciationError)
        newErrors.phoneticPronunciation = 'Pronunciation is mandatory';
      if (isNicknameError) newErrors.nickname = 'Nickname is mandatory';
      if (isNortheasternIDError) newErrors.northeasternID = 'NUID is mandatory';
      if (isEmailError) newErrors.email = 'Email is mandatory';
      if (isPhoneNumberError)
        newErrors.phoneNumber = 'Phone Number is mandatory';
      if (isCollegeError) newErrors.college = 'College is mandatory';
      if (isMinorError) newErrors.minors = 'Minor is mandatory';
      if (isMajorError) newErrors.major = 'Major is mandatory';
      if (isconstituencyNameError)
        newErrors.constituencyName = 'Constituency Name is mandatory';
      if (isYearError) newErrors.year = 'Year is mandatory';
      if (isConstituencyError)
        newErrors.constituency = 'Constituency is mandatory';
      if (isConstituencyTypeError)
        newErrors.selectedConstituencyType = 'Constituency Type is mandatory';
      if (isReturningSenatorError)
        newErrors.selectedReturningType = 'Field is mandatory';
      if (isAttestationError)
        newErrors.selectedAttestation = 'Please accept the acknowledgement';

      setErrors(newErrors);
      // if (!validateForm()) {
      console.log('error message here');
      return;
      // }
    }

    const formData = {
      fullName,
      preferredFullName,
      phoneticPronunciation,
      nickname,
      nuid: northeasternID,
      email,
      phoneNumber,
      college,
      major,
      minors,
      constituencyName: constituencyName,
      year: year,
      constituency: constituency,
      selectedConstituencyType: constituencyType,
      selectedReturningType: returningSenatorType,
      selectedAttestation: attestation,
      pronouns: pronouns.join(', '),
    };
    console.log(JSON.stringify(formData))
    fetch('https://nomination-system-3yub.onrender.com/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((data) => {
        if (data.ok) {
          setIsPopupOpen(true);
        } else {
          console.log(`Application failed to submit: ${data.statusText}`);
          data
            .json()
            .then((responseBody) => {
              // Extract and log the 'message' property from the response
              if (responseBody && responseBody.message) {
                console.log('Error Message:', responseBody.message);
                setErrorMessage(responseBody.message);
                setErrorOpen(true);
              } else {
                console.log('Unexpected response format:', responseBody);
              }
            })
            .catch((error) => {
              console.error('Error reading response body as JSON:', error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <SampleForm>
        <Introduction>
          <h2>SGA Senator Application Form</h2>
          Thank you for your interest in joining the Student Government
          Association (SGA)! SGA serves as the voice of the undergraduate
          student body and strives to promote student interests in the
          university and its surrounding communities. We have many active
          projects and initiatives. Read more about our work <a href="https://northeasternsga.com" target="_blank" rel="noopener noreferrer">here</a>.
          <br></br>
          <br></br>
          Any undergraduate student in good academic and judicial standing is
          eligible to apply to become a senator. There are no elections. Read
          more about the process to become a senator in the <a href="https://docs.google.com/document/d/1xDyzPBpnlzlHmPL9pd2mGsKhzQCl_Cs9EPlFb0G-Y_o/edit" target="_blank" rel="noopener noreferrer"> frequently asked questions document</a> and please contact Senate Speaker Donoghue at
          Donoghue.ca@northeastern.edu with any questions.
          <br></br>
          <br></br>
          This form is the first step in becoming a senator, the second step is
          to gather signatures. For your application to be accepted, you need to
          collect at least 30 nominations from students in your constituency. If
          you are applying to be a special interest senator and your
          organization has less than 40 members, you must get three fourths of
          the organization’s members’ signatures. This form must be submitted so
          your name can be automatically added to the signature collection form.
          Both forms will stop accepting submissions on January 30th at 11:59 pm
          EST.
          <br></br>
          <br></br>
          Welcome to SGA!
        </Introduction>
      </SampleForm>

      <SampleForm>
        <FormControl error={isSubmitted && !!errors.fullName}>
          <FormQuestionContainer>
            <FormTextContainer>
              <b>What is your full name?</b>
              <br />
              Please enter your full name as it appears in the university
              records. This name will only be used in official communications
              between SGA leadership and university administrators.
            </FormTextContainer>
            <FormTextAnswerContainer>
              <FormInput
                label="Required"
                placeholder="Your Full Name"
                required
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) {
                    errors.fullName = '';
                  }
                }}
                error={isSubmitted && !!isTextFieldError}
                helperText={isSubmitted && errors.fullName}
              />
            </FormTextAnswerContainer>
          </FormQuestionContainer>
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormControl error={isSubmitted && !!errors.preferredFullName}>
          <FormQuestionContainer>
            <FormTextContainer>
            <b>What is your preferred name?</b>
              <br />
              Please enter your preferred first and last name. Do not enter any
              nicknames in this field. This name will be used for all official
              SGA business. It will be posted on the website and printed on your
              senator placard.
            </FormTextContainer>
            <FormTextAnswerContainer>
              <FormInput
                label="Required"
                required
                placeholder="Your Preferred Name"
                value={preferredFullName}
                onChange={(e) => {
                  setPreferredFullName(e.target.value);
                  if (errors.preferredFullName) {
                    errors.preferredFullName = '';
                  }
                }}
                error={isSubmitted && !!isPreferredFullNameError}
                helperText={isSubmitted && errors.preferredFullName}
              />
            </FormTextAnswerContainer>
          </FormQuestionContainer>
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormControl error={isSubmitted && !!errors.phoneticPronunciation}>
          <FormQuestionContainer>
            <FormTextContainer>
            <b>What is the phonetic pronunciation of your name?</b>
              <br />
              Please enter how to pronounce your name. This pronunciation will
              be used during roll-call votes.
            </FormTextContainer>
            <FormTextAnswerContainer>
              <FormInput
                label="Required"
                required
                placeholder="Name Pronunciation"
                value={phoneticPronunciation}
                onChange={(e) => {
                  setPhoneticPronunciation(e.target.value);
                  if (errors.phoneticPronunciation) {
                    errors.phoneticPronunciation = '';
                  }
                }}
                error={isSubmitted && !!isPhoneticPronunciationError}
                helperText={isSubmitted && errors.phoneticPronunciation}
              />
            </FormTextAnswerContainer>
          </FormQuestionContainer>
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormControl error={isSubmitted && !!errors.nickname}>
          <FormQuestionContainer>
            <FormTextContainer>
            <b>What is your nickname?</b>
              <br />
              If you have a nickname, please enter it here. This name will not
              be used in official SGA business, but it will be used informally
              when appropriate.
            </FormTextContainer>
            <FormTextAnswerContainer>
              <FormInput
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  if (errors.nickname) {
                    errors.nickname = '';
                  }
                }}
                error={isSubmitted && !!isNicknameError}
                helperText={isSubmitted && errors.nickname}
              />
            </FormTextAnswerContainer>
          </FormQuestionContainer>
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormControl error={isSubmitted && !!errors.northeasternID}>
          <FormQuestionContainer>
            <FormTextContainer>
            <b>What is your NUID?</b>
              <br />
            </FormTextContainer>
            <FormTextAnswerContainer>
              <FormInput
                label="Required"
                required
                placeholder="NUID"
                value={northeasternID}
                onChange={(e) => {
                  setNortheasternID(e.target.value);
                  if (errors.northeasternID) {
                    errors.northeasternID = '';
                  }
                }}
                error={isSubmitted && !!isNortheasternIDError}
                helperText={isSubmitted && errors.northeasternID}
              />
              <br />
            </FormTextAnswerContainer>
          </FormQuestionContainer>
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormControl error={isSubmitted && !!errors.pronouns}>
          <FormQuestionContainer>
            <FormTextContainer>
              <b>What pronouns do you use?</b>
            </FormTextContainer>
            <FormInputCheckbox>
              <FormControlLabel
                required
                control={<Checkbox />}
                onChange={handleCheckboxChange}
                label="She/her/her"
                value="She/her/her"
                checked={pronouns.includes('She/her/her')}
              />
              <FormControlLabel
                required
                control={<Checkbox />}
                onChange={handleCheckboxChange}
                label="He/him/his"
                value="He/him/his"
                checked={pronouns.includes('He/him/his')}
              />
              <FormControlLabel
                required
                control={<Checkbox />}
                onChange={handleCheckboxChange}
                label="They/them/their"
                value="They/them/their"
                checked={pronouns.includes('They/them/their')}
              />
              <FormControlLabel
                required
                control={<Checkbox />}
                onChange={handleCheckboxChange}
                label="Other"
                value="Other"
                checked={pronouns.includes('Other')}
              />
            </FormInputCheckbox>
          </FormQuestionContainer>
          {errors.pronouns && (
            <FormHelperText>{errors.pronouns}</FormHelperText>
          )}
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormControl error={isSubmitted && !!errors.email}>
          <FormQuestionContainer>
            <FormTextContainer>
            <b>What is your Northeastern email?</b>
              <br />
              All email communications will be sent to this address.
            </FormTextContainer>
            <FormTextAnswerContainer>
              <FormInput
                label="Required"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    errors.email = '';
                  }
                }}
                error={isSubmitted && !!isEmailError}
                helperText={isSubmitted && errors.email}
              />
            </FormTextAnswerContainer>
          </FormQuestionContainer>
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormControl error={isSubmitted && !!errors.phoneNumber}>
          <FormQuestionContainer>
            <FormTextContainer>
            <b>What is your phone number?</b>
              <br />
              Please enter your cell phone number. If you do not have a phone
              that can receive calls and texts in the United States, note so
              here. Make sure to include the country code if your phone number
              has a country code other than 1 (most North American countries and
              islands).
            </FormTextContainer>
            <FormTextAnswerContainer>
              <FormInput
                label="Required"
                required
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  if (errors.phoneNumber) {
                    errors.phoneNumber = '';
                  }
                }}
                error={isSubmitted && !!isPhoneNumberError}
                helperText={isSubmitted && errors.phoneNumber}
              />
            </FormTextAnswerContainer>
          </FormQuestionContainer>
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormControl error={isSubmitted && !!errors.year}>
          <FormQuestionContainer>
            <FormTextContainer>
            <b>What is your year?</b>
              <br />
            </FormTextContainer>
            <RadioButtons>
              <RadioGroup
                name="year-buttons-group"
                value={year?.toString()}
                onChange={handleYearChange}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Undergraduate first year"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Undergraduate second year"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Undergraduate third year"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Undergraduate fourth year"
                />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="Undergraduate fifth+ year"
                />
              </RadioGroup>
            </RadioButtons>
            {errors.year && <FormHelperText>{errors.year}</FormHelperText>}
          </FormQuestionContainer>
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormControl error={isSubmitted && !!errors.college}>
          <FormQuestionContainer>
            <FormTextContainer>
            <b>What is your college?</b>
              <br />
              For combined majors (a single major listed in the course catalog
              that spans two disciplines), list only the home college. For
              double majors (two distinct majors listed separately in the course
              catalog), include both colleges.
            </FormTextContainer>
            <FormTextAnswerContainer>
              <FormInput
                label="Required"
                required
                placeholder="College"
                value={college}
                onChange={(e) => {
                  setCollege(e.target.value);
                  if (errors.college) {
                    errors.college = '';
                  }
                }}
                error={isSubmitted && !!isCollegeError}
                helperText={isSubmitted && errors.college}
              />
              <br />
            </FormTextAnswerContainer>
          </FormQuestionContainer>
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormControl error={isSubmitted && !!errors.major}>
          <FormQuestionContainer>
            <FormTextContainer>
              <b>What is your major?</b>
            </FormTextContainer>
            <FormTextAnswerContainer>
              <FormInput
                label="Required"
                required
                placeholder="Major"
                value={major}
                onChange={(e) => {
                  setMajor(e.target.value);
                  if (errors.major) {
                    errors.major = '';
                  }
                }}
                error={isSubmitted && !!isMajorError}
                helperText={isSubmitted && errors.major}
              />
              <br />
            </FormTextAnswerContainer>
          </FormQuestionContainer>
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormControl error={isSubmitted && !!errors.minors}>
          <FormQuestionContainer>
            <FormTextContainer>
              <b>What are your minors?</b>
            </FormTextContainer>
            <FormTextAnswerContainer>
              <FormInput
                placeholder="Minors"
                value={minors}
                onChange={(e) => {
                  setMinors(e.target.value);
                  if (errors.minors) {
                    errors.minors = '';
                  }
                }}
                error={isSubmitted && !!isMinorError}
                helperText={isSubmitted && errors.minors}
              />
              <br />
            </FormTextAnswerContainer>
          </FormQuestionContainer>
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormControl error={isSubmitted && !!errors.constituency}>
          <FormQuestionContainer>
            <FormTextContainer>
              <b>What is your constituency?</b>
              <br />
              Academic senators represent an official Northeastern academic
              college or program. Example constituencies include the College of
              Engineering, the Global Scholars program, or the Honors program.
              Students in specialized entrance programs can only apply to become
              a senator representing a specialized entrance program as a
              constituency while actively enrolled in the program. For example,
              students can only apply to be NUin senators as first-semester
              students. Most senators are academic senators.
              <br />
              <br />

              Special interest senators are selected by the members and
              executive board of the organization they intend to represent.
              Example constituencies include Greek life organizations and clubs.
              More information about the difference between academic and special
              interest senators is available in the frequently asked questions
              document located at
              https://docs.google.com/document/d/1xDyzPBpnlzlHmPL9pd2mGsKhzQCl_Cs9EPlFb0G-Y_o/edit.
              <br />
            </FormTextContainer>
            <RadioButtons>
              <RadioGroup
                name="constituency-buttons-group"
                value={constituency}
                onChange={handleConstituencyChange}
              >
                <FormControlLabel
                  value="academic"
                  control={<Radio />}
                  label="Academic senator"
                />
                <FormControlLabel
                  value="special"
                  control={<Radio />}
                  label="Special interest senator"
                />
              </RadioGroup>
            </RadioButtons>
          </FormQuestionContainer>
          {errors.constituency && (
            <FormHelperText>{errors.constituency}</FormHelperText>
          )}
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormControl>
          <FormTextContainer>
            <h3>Special Interest Senator Constituency Information</h3>
            Note: Special interest senators applying from a student organization
            with less than 30 members must submit a paper nomination. Paper
            applications are available to pick up at the SGA office, 332 Curry.
          </FormTextContainer>
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormControl error={isSubmitted && !!errors.selectedConstituencyType}>
          <FormQuestionContainer>
            <FormTextContainer>
            <b>What type of constituency would you like to represent?</b>
            </FormTextContainer>
            <RadioButtons>
              <RadioGroup
                name="constituency-type-buttons-group"
                value={constituencyType}
                onChange={handleConstituencyTypeChange}
              >
                <FormControlLabel
                  value="club"
                  control={<Radio />}
                  label="Official club"
                />
                <FormControlLabel
                  value="greek"
                  control={<Radio />}
                  label="Greek organization"
                />
              </RadioGroup>
            </RadioButtons>
          </FormQuestionContainer>
          {errors.selectedConstituencyType && (
            <FormHelperText>{errors.selectedConstituencyType}</FormHelperText>
          )}
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormControl required error={isSubmitted && !!errors.constituency}>
          <FormQuestionContainer>
            <FormTextContainer>
              <b>Select a college, organization, or program from the list below
                of the name of your constituency</b>
                {' '}
                <br/>
                Only recognized student organizations may have a special interest senator.
                
            </FormTextContainer>
            <FormTextAnswerContainer>
              <FormSelect
                required
                onChange={(e) => {
                  setConstituencyName(e.target.value as string);
                  if (errors.constituencyName) {
                    errors.constituencyName = '';
                  }
                }}
              >
                {/* TODO Insert MenuItems using database of Constituents */}
                <MenuItem value={'Alpha Chi Omega Sorority'}>
                  Alpha Chi Omega Sorority
                </MenuItem>
                <MenuItem value={'Alpha Epsilon Phi'}>
                  Alpha Epsilon Phi
                </MenuItem>
                <MenuItem value={'Alpha Epsilon Pi'}>Alpha Epsilon Pi</MenuItem>
                <MenuItem value={'Bouvé College of Health Sciences'}>
                  Bouvé College of Health Sciences
                </MenuItem>
                <MenuItem value={'College of Science'}>
                  College of Science
                </MenuItem>
                <MenuItem value={'College of Social Sciences and Humanities'}>
                  College of Social Sciences and Humanities
                </MenuItem>
                <MenuItem value={"D'Amore-McKim School of Business"}>
                  D'Amore-McKim School of Business
                </MenuItem>
                <MenuItem value={'Delta Phi Epsilon'}>
                  Delta Phi Epsilon
                </MenuItem>
                <MenuItem value={'Delta Tau Delta'}>Delta Tau Delta</MenuItem>
                <MenuItem value={'Delta Zeta'}>Delta Zeta</MenuItem>
                <MenuItem value={'Global Scholars program'}>
                  Global Scholars program
                </MenuItem>
                <MenuItem value={'Honors program'}>Honors program</MenuItem>
                <MenuItem value={'Kappa Delta'}>Kappa Delta</MenuItem>
                <MenuItem value={'Khoury College of Computer Sciences'}>
                  Khoury College of Computer Sciences
                </MenuItem>
                <MenuItem
                  value={'Northeastern University Real Estate Club (NURE)'}
                >
                  Northeastern University Real Estate Club (NURE)
                </MenuItem>
                <MenuItem value={'NU Immerse'}>NU Immerse</MenuItem>
                <MenuItem value={'Phi Sigma Rho'}>Phi Sigma Rho</MenuItem>
                <MenuItem value={'Sandbox'}>Sandbox</MenuItem>
              </FormSelect>
            </FormTextAnswerContainer>
            {isSubmitted && errors.constituency && (
              <FormHelperText>{errors.constituency}</FormHelperText>
            )}
          </FormQuestionContainer>
        </FormControl>
      </SampleForm>

      

      

      <SampleForm>
        <FormControl>
          <FormTextContainer>
            <h3>SGA Senator Nomination Form</h3>
          </FormTextContainer>
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormControl>
          <FormQuestionContainer>
            <FormTextContainer>
            <b>Are you a returning senator?</b>
              <br />
              Select "yes" only if you have completed the Senator Education and
              Training Program (STEP) and remained a senator in good standing
              for at least one entire semester.
            </FormTextContainer>
            <RadioButtons>
              <RadioGroup
                name="returning-type-buttons-group"
                value={returningSenatorType}
                onChange={handleReturningTypeChange}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </RadioButtons>
          </FormQuestionContainer>
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormControl error={isSubmitted && !!errors.selectedAttestation}>
          <FormQuestionContainer>
            <FormTextContainer>
              <b>Acknowledgment and Attestation</b>
              <br />
              Please carefully read the following statement and select the
              button below if you agree: I attest that I am the undergraduate
              student in good academic and judicial standing listed on this form
              and that all information I am submitting is completely truthful
              and accurately presented; I authorize the Northeastern University
              Student Government Association to verify the information on this
              form, and I agree to abide by every responsibility and expectation
              of a senator, including attending weekly senate meetings and
              maintaining effective communication with my constituents.
            </FormTextContainer>
            <RadioButtons>
              <RadioGroup
                name="attestation-buttons-group"
                value={attestation}
                onChange={handleAttestationChange}
              >
                <FormControlLabel
                  value="agree"
                  control={<Radio />}
                  label="I have carefully read and fully agree to the statement above."
                />
                {isSubmitted && errors.selectedAttestation && (
                  <FormHelperText>{errors.selectedAttestation}</FormHelperText>
                )}
              </RadioGroup>
            </RadioButtons>
          </FormQuestionContainer>
        </FormControl>
      </SampleForm>

      <Button variant="contained" onClick={submitApplication}>
        Submit
      </Button>
    </>
  );
};

export default ApplicationForm;
