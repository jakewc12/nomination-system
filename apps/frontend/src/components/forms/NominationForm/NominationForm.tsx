import { useState, useEffect } from 'react';
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
  SampleForm,
  FormTextContainer,
  FormQuestionContainer,
  FormTextAnswerContainer,
  FormSelect,
  RadioButtons,
  Title,
  Introduction,
} from './styles';

interface Props {
  setIsPopupOpen: (open: boolean) => void;
  setErrorMessage: (message: string) => void;
  setErrorOpen: (open: boolean) => void;
}

const NominationForm: React.FC<Props> = ({ setIsPopupOpen, setErrorMessage, setErrorOpen }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [nominee, setNominee] = useState('');
  const [constituency, setConstituency] = useState('');
  const [college, setCollege] = useState('');
  const [major, setMajor] = useState('');
  const [graduationYear, setGraduationYear] = useState(0);
  const [receiveSenatorInfo, setReceiveSenatorInfo] = useState(false);
  const [nomineeNames, setNomineeNames] = useState([])

  const isFullNameError = fullName === '';
  const isEmailError = email === '';
  const isNomineeError = nominee === '';
  const isConstituencyError = constituency === '';
  const isCollegeError = college === '';
  const isMajorError = major === '';
  const isGraduationYearError = graduationYear === 0;

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    nominee?: string;
    constituency?: string;
    college?: string;
    major?: string;
    graduationYear?: string;
  }>({});

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const getData = (url: string) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          console.log('errored');
          throw new Error('Failed to fetch data');
        }
        console.log('didnt error');
        const out = response.json();
        console.log(out);
        return out;
      })
      .then((data) => {
        console.log('data:', data);
        setNomineeNames(data)
        console.log('nominees:', nomineeNames)
      })
      .catch((error) => {
        console.error('Error fetching:', error);
      });
  };
  useEffect(() => {
    getData('https://nomination-system-2.onrender.com/api/nominations/unique-nominees');
  }, );
  //getData(getFullPath('/api/nominations'), setNominations);

  const handleSampleFormSubmit = () => {
    setErrorOpen(false)
    setIsSubmitted(true);
    if (
      isFullNameError ||
      isEmailError ||
      isNomineeError ||
      isConstituencyError ||
      isCollegeError ||
      isMajorError ||
      isGraduationYearError
    ) {
      // TODO show error popup with message

      const newErrors: {
        fullName?: string;
        email?: string;
        nominee?: string;
        constituency?: string;
        college?: string;
        major?: string;
        graduationYear?: string;
      } = {};

      if (isFullNameError) newErrors.fullName = 'Name is mandatory';
      if (isEmailError) newErrors.email = 'Email is mandatory';
      if (isNomineeError) newErrors.nominee = 'Nominee is mandatory';
      if (isConstituencyError)
        newErrors.constituency = 'Constituency is mandatory';
      if (isCollegeError) newErrors.college = 'College is mandatory';
      if (isMajorError) newErrors.major = 'Major is mandatory';
      if (isGraduationYearError)
        newErrors.graduationYear = 'Graduation Year is mandatory';

      setErrors(newErrors);

      console.log('invalid inputs');
      return;
    }

    const formValues = {
      fullName,
      email,
      nominee,
      constituency,
      college,
      major,
      graduationYear,
      receiveSenatorInfo,
    };

    fetch('https://nomination-system-2.onrender.com/api/nominations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues),
    })
      .then((data) => {
        if (data.ok) {
          setIsPopupOpen(true);
        } else {
          // LIKE LEGIT ACTUALLY SHOW MESSAGE HERE
          console.log(`Nomination failed to submit: ${data.statusText}`);
          data.json()
        .then((responseBody) => {
          // Extract and log the 'message' property from the response
          if (responseBody && responseBody.message) {
            console.log('Error Message:', responseBody.message);
            setErrorMessage(responseBody.message)
            setErrorOpen(true)
          } else {
            console.log('Unexpected response format:', responseBody);
          }
        })
        .catch((error) => {
          console.error('Error reading response body as JSON:', error);
          setErrorMessage('Error reading response body as JSON:' + error)
          setErrorOpen(true)
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
        <h2>SGA Senator Nomination Form</h2>
        <p>
          Complete this form to nominate a person to become a senator in the
          Student Government Association (SGA). SGA serves as the voice of the
          undergraduate student body and strives to promote student interests in
          the university and its surrounding communities. To learn more about
          SGA, visit our website at northeasternsga.com.
        </p>
        <p>
          This form is a nomination, not a vote. It is simply a statement you
          would like to see one of your peers become a senator in SGA. You may
          complete this form for an unlimited number of prospective senators,
          but you may only nominate each student once. You must belong to the
          same constituency as the prospective senator seeks to represent (so
          only undergraduate students in the College of Engineering may nominate
          senators for the College of Engineering, only NUin students may
          nominate senators for the NUin program, etc).
        </p>
        <p>
          SGA senator applications are currently open. To apply for a
          {/* TODO include valid url to senator applications form */}
          senatorship, visit <a href="http://localhost:4200/applications">Senator Applications</a>
        </p>
        <p>
          Please contact Cassidy Donoghue at donoghue.ca@northeastern.edu with
          any questions.
        </p>
        </Introduction>
      </SampleForm>

      <SampleForm>
        <FormControl required error={isSubmitted && !!errors.fullName}>
          <FormQuestionContainer>
            <FormTextContainer>
              <b>What is your full name?</b>
              <br/>
                Please enter your first and last name as they appear in the
                official university records.
              
            </FormTextContainer>
            <FormTextAnswerContainer>
              <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue=""
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) {
                    errors.fullName = '';
                  }
                }}
                error={isSubmitted && !!isFullNameError}
                helperText={isSubmitted && errors.fullName}
              />
            </FormTextAnswerContainer>
          </FormQuestionContainer>
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormControl required error={isSubmitted && !!errors.email}>
          <FormQuestionContainer>
            <FormTextContainer>
              <b>What is your Northeastern email?</b>
                <br/>
                We may contact you to verify the authenticity of this
                nomination.
            </FormTextContainer>
            <FormTextAnswerContainer>
              <TextField
                required
                id="outlined-required"
                label="Required"
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
        <FormControl required error={isSubmitted && !!errors.nominee}>
          <FormQuestionContainer>
            <FormTextContainer>
              <b>Select the name of the person you are nominating</b>
            </FormTextContainer>
            <FormTextAnswerContainer>
              <FormSelect
                required
                label="nominee"
                onChange={(e) => {
                  setNominee(e.target.value as string);
                  if (errors.nominee) {
                    errors.nominee = '';
                  }
                }}
              >
                {
                  nomineeNames.map((name, index)=> (
                    <MenuItem key={index} value={name}>{name}</MenuItem>
                  ))
                }
              </FormSelect>
            </FormTextAnswerContainer>
            {isSubmitted && errors.nominee && (
              <FormHelperText>{errors.nominee}</FormHelperText>
            )}
          </FormQuestionContainer>
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormControl required error={isSubmitted && !!errors.constituency}>
          <FormQuestionContainer>
            <FormTextContainer>
              <b>Select a college, organization, or program from the list below
                to confirm you are one of the prospective senator's
                constituents.</b>
                {' '}
                <br/>
                Select the name of the person you are nominating.
                  You must select the same constituency as the prospective
                  senator for this nomination to be processed. Please confirm you are one of the prospective senator's
                  constituents.
                
            </FormTextContainer>
            <FormTextAnswerContainer>
              <FormSelect
                required
                onChange={(e) => {
                  setConstituency(e.target.value as string);
                  if (errors.constituency) {
                    errors.constituency = '';
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
        <FormControl required error={isSubmitted && !!errors.college}>
          <FormQuestionContainer>
            <FormTextContainer>
              <b>What is your college?</b>
                <br/>
                Note: For combined majors (a single major listed in the course
                catalog that spans two disciplines), list only the home college.
                For double majors (two distinct majors listed separately in the
                course catalog), include both colleges.
            </FormTextContainer>
            <FormTextAnswerContainer>
              <TextField
                required
                id="outlined-required"
                label="Required"
                onChange={(e) => {
                  setCollege(e.target.value);
                  if (errors.college) {
                    errors.college = '';
                  }
                }}
                error={isSubmitted && !!isCollegeError}
                helperText={isSubmitted && errors.college}
              />
            </FormTextAnswerContainer>
          </FormQuestionContainer>
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormControl required error={isSubmitted && !!errors.major}>
          <FormQuestionContainer>
            <FormTextContainer>
              <b>What is your major?</b>
            </FormTextContainer>
            <FormTextAnswerContainer>
              <TextField
                required
                id="outlined-required"
                label="Required"
                onChange={(e) => {
                  setMajor(e.target.value);
                  if (errors.major) {
                    errors.major = '';
                  }
                }}
                error={isSubmitted && !!isMajorError}
                helperText={isSubmitted && errors.major}
              />
            </FormTextAnswerContainer>
          </FormQuestionContainer>
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormControl error={isSubmitted && !!errors.graduationYear}>
          <FormQuestionContainer>
            <FormTextContainer>
              <b>What is your expected graduation year?</b>
            </FormTextContainer>
            <RadioButtons>
              <RadioGroup
                name="year-buttons-group"
                aria-required
                onChange={(e) => {
                  setGraduationYear(Number.parseInt(e.target.value));
                  if (errors.graduationYear) {
                    errors.graduationYear = '';
                  }
                }}
                /* TODO pick up radio options from env variable */
              >
                <FormControlLabel
                  value={2023}
                  control={<Radio />}
                  label="2023"
                />
                <FormControlLabel
                  value={2024}
                  control={<Radio />}
                  label="2024"
                />
                <FormControlLabel
                  value={2025}
                  control={<Radio />}
                  label="2025"
                />
                <FormControlLabel
                  value={2026}
                  control={<Radio />}
                  label="2026"
                />
                <FormControlLabel
                  value={2027}
                  control={<Radio />}
                  label="2027"
                />
                <FormControlLabel
                  value={2028}
                  control={<Radio />}
                  label="2028"
                />
              </RadioGroup>
            </RadioButtons>
            {isSubmitted && errors.graduationYear && (
              <FormHelperText>{errors.graduationYear}</FormHelperText>
            )}
          </FormQuestionContainer>
        </FormControl>
      </SampleForm>

      <SampleForm>
        <FormQuestionContainer>
          <FormTextContainer>
            <b>Would you like to receive information about how to become a
            senator?</b> 
            <br/>
              Becoming a senator is an excellent, rewarding opportunity to serve
              and improve the Northeastern community.
          </FormTextContainer>
          <RadioButtons>
            <RadioGroup
              aria-required
              name="receive-buttons-group"
              onChange={(e) => setReceiveSenatorInfo(e.target.value === 'Yes')}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </RadioButtons>
        </FormQuestionContainer>
      </SampleForm>

      <Button variant="contained" onClick={handleSampleFormSubmit}>
        Submit
      </Button>
    </>
  );
};

export default NominationForm;
