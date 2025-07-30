import Button from '@mui/material/Button';
import styled from 'styled-components';
import DashboardImage from '../../assets/dashboard-background.png';
import DashboardGradient from '../../assets/dashboard-gradient.png';


export const HomeContainer = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundImage: `url(${DashboardGradient})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '100vw',
  minHeight: '100vh',
  height: 'auto',
  padding: '2rem',
  '@media (max-width: 768px)': {
    padding: '15px', 
  },
}));

export const Nominations = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#fff',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  textAlign:'center',
  width: '80%',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 0',
  '@media (max-width: 768px)': {
    width: '80%',
    minHeight: 'auto', 
  },
}));

export const NominationBoxes = styled.div(() => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '100%',
  marginTop: '1rem',
  marginBottom: '1rem',
  '@media (max-width: 768px)': {
    flexWrap: "wrap",
  },
}));

export const NominationBox = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f9f9f9',
  padding: '15px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  minHeight: '150px',
  flex: '1 1 250px',
  maxWidth: '300px',
}));

export const NominationTitle = styled.h2(() => ({
  marginBottom: '10px',
  fontSize: '1.4rem',
  
}));

export const NominationValue = styled.p(() => ({
  fontSize: '1.4rem',
  fontWeight: 'bold',
}));

export const InputContainer = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
  width: '50%',
  padding: '15px 20px',
  borderRadius: '8px',
  top: '0',
  zIndex: '1000',

  '@media (max-width: 768px)': {
    width: '80%',
  },
}));

export const InputNUID = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '400px',
  height: '200px',
  borderRadius: '15px',
  border: '1px solid #000',
  background: '#FFF',
  paddingLeft: '30px',
  paddingRight: '30px',
  paddingTop: '20px',
  paddingBottom: '20px',
  marginTop: '10%',
}));

export const NUIDInput = styled.input(() => ({
  width: '100%',
  height: '50px',
  borderRadius: '5px',
  border: '1px solid #000',
  background: '#FFF',
  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  padding: '10px',
  fontSize: '1rem',
}));

export const NUIDLabel = styled.label(() => ({
  fontSize: '1rem',
  fontWeight: '700',
  marginBottom: '5px',
  alignSelf: 'flex-start',
}));

export const Title = styled.h1(() => ({
  textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  fontSize: '2.5rem',
}));

export const Subtitle = styled.p(() => ({
  fontSize: '1.2rem',
  background: 'rgba(255, 250, 250, 0.6)',
  backdropFilter: 'blur(5px)',
  maxWidth: '50%',
  lineHeight: '20px',
  padding: '20px 20px',
  fontWeight: '500',
  letterSpacing: '-0.456px',
  borderRadius: '5px',
  marginTop: '0px',
  '@media (max-width: 768px)': {
    maxWidth: '90%',
  },
}));

export const SubmitButton = styled.button(() => ({
  padding: '10px 20px',
  background: ' #C8102E',
  width: '100%',
  height: '59px',
  color: 'white',
  border: 'none',
  borderRadius: '15px',
  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  cursor: 'pointer',
  fontSize: '1.4rem',
  textAlign: 'center',
  textShadow: '0px 4px 4px rgba(243, 145, 145, 0.25)',
  fontStyle: 'italic',
  fontWeight: '700',
  marginTop: '10px',
  '&:hover': {
    backgroundColor: '#A00E24',
  },
}));