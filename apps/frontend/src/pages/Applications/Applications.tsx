import { useState } from 'react';

import { HomeContainer } from './styles';
import ApplicationForm from '../../components/forms/ApplicationForm';
import ErrorPopUp from '../../components/ErrorPopUp';

const Applications: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isErrorOpen, setErrorOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  return (
    <HomeContainer>
      <ApplicationForm 
      setIsPopupOpen={setIsPopupOpen} 
      setErrorMessage={setErrorMessage} 
      setErrorOpen={setErrorOpen}
      />

      <ErrorPopUp 
      open = {isErrorOpen}
      setOpen={setErrorOpen}
      message={errorMessage}
      />

    </HomeContainer>
  );
};

export default Applications;
