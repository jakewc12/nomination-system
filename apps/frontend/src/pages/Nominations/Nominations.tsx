import React, { useState } from 'react';

import { HomeContainer } from '../Nominations/styles';
import NominationForm from '../../components/forms/NominationForm';
import ErrorPopUp from '../../components/ErrorPopUp';

const Nominations: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isErrorOpen, setErrorOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <HomeContainer>
      <NominationForm setIsPopupOpen={setIsPopupOpen} 
      setErrorMessage={setErrorMessage} 
      setErrorOpen={setErrorOpen}/>

    <ErrorPopUp 
    open = {isErrorOpen}
    setOpen={setErrorOpen}
    message={errorMessage}
    />
    </HomeContainer>
  );
};

export default Nominations;
