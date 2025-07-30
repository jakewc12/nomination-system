import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const Hero = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '90vh',
  width: '100vw',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    // height: '70vh',
  },
}));

export const InfoSection = styled('div')(({ theme }) => ({
  backgroundColor: '#f9f9f9',
  minHeight: '90vh',
  padding: '5vw',
  [theme.breakpoints.down('sm')]: {},
}));

export const BackgroundImageContainer = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -2,
}));

export const Overlay = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.44)',
  zIndex: -1,
}));

export const ContentOverlay = styled('div')(() => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '3vh',
  height: '100%',
  width: '100vw',
  padding: '3vw',
  textAlign: 'center',
  color: 'white',
  zIndex: 1,
}));

export const ButtonsContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
}));

export const HomeH1 = styled('h1')(({ theme }) => ({
  fontSize: '3.5rem',
  fontStyle: 'italic',
  fontWeight: 'bold',
  textShadow: '7px 7px 10px rgba(0, 0, 0, 0.8)',
  margin: 0,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.75rem',
  },
}));

export const HomeH2 = styled('p')(({ theme }) => ({
  fontSize: '1.5rem',
  margin: '10px 0',
  fontWeight: 'bold',
  textShadow: '5px 5px 7px rgba(0, 0, 0, 0.7)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    margin: '1vw',
  },
}));

export const HomeP = styled('p')(() => ({
  lineHeight: '1.5',
  fontSize: '1rem',
  marginBottom: '20px',
}));

export const SGASection = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
}));

export const SenatorSection = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginTop: '3vh',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'left',
  },
}));

export const Arrow = styled('div')(() => ({
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  cursor: 'pointer',
  zIndex: 1,
}));

export const Line = styled('div')(({ theme }) => ({
  height: '4px', // Thicker line
  flex: 1, // Stretch the line to fill remaining space
  backgroundColor: 'black',
  borderRadius: '50px', // Make the line rounded
  marginTop: '35px',
  marginRight: '15px',
  [theme.breakpoints.down('sm')]: {
    // Invisible for mobile
    flex: 0,
    marginRight: '0px',
    height: '0px',
    width: '0px',
  },
}));

export const HomeButton = styled(Button)(({ theme }) => ({
  fontWeight: 'bold',
  minWidth: '10vw',
  minHeight: '7vh',
  [theme.breakpoints.down('sm')]: {},
}));
