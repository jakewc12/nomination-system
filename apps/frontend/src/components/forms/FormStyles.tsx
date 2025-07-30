import FormGroup from '@mui/material/FormGroup';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

export const SampleForm = styled(FormGroup)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 10,
  width: '60%', // Desktop width
  paddingBottom: '2%',

  [theme.breakpoints.down('sm')]: {
    width: '90%', // Mobile width
  },
}));

export const FormQuestionText = styled('h1')(() => ({
  marginBottom: '-1%',
  fontSize: '2rem',
}));

export const FormDescriptionText = styled('p')(() => ({}));

export const FormInput = styled(TextField)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '100%',
  id: 'filled-required',
}));

export const FormSelect = styled(Select)(() => ({
  width: '50%',
  justifyContent: 'center',
}));

export const FormQuestionContainer = styled('div')(() => ({
  border: '1px',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  boxShadow: '2px 2px 5px #ccc',
  borderRadius: '5px',
  margin: '10px',
  display: 'block',
}));

export const FormTextContainer = styled('div')(() => ({
  marginBottom: '4%',
  padding: '0%',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const FormTextAnswerContainer = styled('div')(() => ({
  display: 'flex',
  paddingBottom: '3%',
  width: '100%',
  justifyContent: 'left',
}));

export const Introduction = styled('div')({
  width: '100%',
  textAlign: 'center',
  margin: '20px 0',
});

export const FormInputCheckbox = styled('div')({
  display: 'flex',
  width: '100%',
  padding: '3%',
  justifyContent: 'center',
  paddingBottom: '3%',
});

export const RadioButtons = styled('div')({
  width: '100%',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: '3%',
});

export const FormControls = styled('div')({
  width: '100%',
  maxWidth: '350px',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
});
