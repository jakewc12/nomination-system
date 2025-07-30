import { Button, TextField, Alert } from '@mui/material';
import styled from 'styled-components';

export const LoginContainer = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  maxWidth: '400px',
  margin: '0 auto',
  textAlign: 'center',
}));

export const StyledTextField = styled(TextField)(() => ({
  marginBottom: '1rem',
  width: '100%',
}));

export const StyledButton = styled(Button)(() => ({
  width: '100%',
}));

export const StyledAlert = styled(Alert)(() => ({
  width: '100%',
  marginTop: '1rem',
}));
