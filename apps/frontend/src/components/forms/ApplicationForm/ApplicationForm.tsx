import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NameSubForm } from './SubForms/NameSubForm';
import { ApplicationFormIntro } from './ApplicationFormIntro';
import { PersonalInfoSubForm } from './SubForms/PersonalInfoSubForm';
import {
  ApplicationErrors,
  ApplicationErrorMessages,
} from './ApplicationErrors';
import { PronounSubForm } from './SubForms/PronounsSubForm';
import { AcademicsSubForm } from './SubForms/AcademicsSubForm';
import { SpecialInterestSubForm } from './SubForms/SpecialInterestSubForm';
import { NominationSubForm } from './SubForms/NominationSubForm';
import { Box, Button } from '@mui/material';
import { getFullPath } from './../../../utils';
interface Props {
  setIsPopupOpen: (open: boolean) => void;
  setErrorMessage: (message: string) => void;
  setErrorOpen: (open: boolean) => void;
}

export interface ApplicationFormData {
  fullName: string;
  preferredFullName: string;
  phoneticPronunciation: string;
  nickname: string;
  nuid: string;
  pronouns: string[];
  email: string;
  phoneNumber: string;
  year?: number;
  college: string;
  major: string;
  minor: string;
  constituency: string;
  constituencyType: string;
  constituencyName: string;
  returningSenatorType: string;
  attestation: string;
  otherConstituencyName?: string;
}

const ApplicationForm: React.FC<Props> = ({
  setIsPopupOpen,
  setErrorMessage,
  setErrorOpen,
}) => {
  const navigate = useNavigate();
  // The state of data in each form.
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    preferredFullName: '',
    phoneticPronunciation: '',
    nickname: '',
    nuid: '',
    pronouns: [],
    email: '',
    phoneNumber: '',
    college: '',
    major: '',
    minor: '',
    constituency: '',
    constituencyType: '',
    constituencyName: '',
    returningSenatorType: 'no',
    attestation: '',
    otherConstituencyName: '',
  });

  // The state of errors for each formData field.
  const [applicationErrors, setApplicationErrors] = useState<ApplicationErrors>(
    {
      fullName: true,
      preferredFullName: true,
      phoneticPronunciation: true,
      nuid: true,
      pronouns: true,
      email: true,
      phoneNumber: true,
      year: true,
      college: true,
      major: true,
      constituency: true,
      constituencyType: true,
      constituencyName: true,
      returningSenatorType: false,
      attestation: true,
      otherConstituencyName: false,
    }
  );

  /**
   * Update the error state of a form field.
   * @param field The error key to be changed.
   * @param value The value to change it to.
   */
  const updateErrors = (field: keyof ApplicationErrors, value: boolean) => {
    setApplicationErrors((prev) => {
      let updatedErrors = { ...prev, [field]: value };

      // Ensure otherConstituencyName is required if constituencyName is "Other"
      if (
        formData.constituencyName === 'Other' &&
        !formData.otherConstituencyName
      ) {
        updatedErrors.otherConstituencyName = true;
      } else {
        updatedErrors.otherConstituencyName = false;
      }

      return updatedErrors;
    });
  };

  /**
   * @returns Are there any errors in the form?
   */
  const hasAnyErrors = () => {
    if (
      formData.constituencyName === 'Other' &&
      !formData.otherConstituencyName
    ) {
      return true;
    }
    return Object.values(applicationErrors).some((value) => value === true);
  };

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const submitApplication = () => {
    setErrorOpen(false);
    setIsSubmitted(true);
    if (hasAnyErrors()) {
      // Handle form error
      return;
    }

    const finalConstituencyName =
      formData.constituencyName === 'Other' && formData.otherConstituencyName
        ? formData.otherConstituencyName
        : formData.constituencyName;

    const data = {
      ...formData,
      constituencyName: finalConstituencyName,
      pronouns: formData.pronouns.join(', '),
      selectedConstituencyType: formData.constituencyType,
      selectedReturningType: formData.returningSenatorType,
      selectedAttestation: formData.attestation,
    };

    delete data.otherConstituencyName;

    console.log(JSON.stringify(data));
    console.log('path', getFullPath('/api/applications'));
    fetch(getFullPath('/api/applications'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((data) => {
        if (data.ok) {
          navigate('/', { state: { formSubmissionSuccess: true, formName: 'Application' } });   
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
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleNextForm = () => {
    setSubFormIndex((prev) => prev + 1);
  };
  const handlePrevForm = () => {
    setSubFormIndex((prev) => prev - 1);
  };

  const isLastPage = () => {
    return subFormIndex === SubForms.length - 1;
  };

  const [subFormIndex, setSubFormIndex] = useState(0);
  const subFormProps = {
    formData: formData,
    setFormData: setFormData,
    updateErrors: updateErrors,
    errors: applicationErrors,
    errorMessages: ApplicationErrorMessages,
    handleNext: handleNextForm,
    handlePrev: handlePrevForm,
  };
  const SubForms = [
    <ApplicationFormIntro handleNext={handleNextForm} />,
    <NameSubForm {...subFormProps} />,
    <PersonalInfoSubForm {...subFormProps} />,
    <PronounSubForm {...subFormProps} />,
    <AcademicsSubForm {...subFormProps} />,
    <SpecialInterestSubForm {...subFormProps} />,
    <NominationSubForm {...subFormProps} />,
  ];

  return (
    <>
      {SubForms[subFormIndex]}
      {isLastPage() && (
        <Box
          sx={{
            marginTop: '3%',
          }}
        >
          <Button
            variant="contained"
            onClick={submitApplication}
            size="large"
            disabled={hasAnyErrors()}
          >
            Submit
          </Button>
        </Box>
      )}
    </>
  );
};

export default ApplicationForm;
