import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  InputLabel,
  TextField,
  FormHelperText,
} from '@mui/material';
import { useState } from 'react';

interface Props {
  setLoginStatus: (isLoggedIn: boolean) => void;
}

export const LoginForm: React.FC<Props> = ({ setLoginStatus }) => {
  const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [userNameError, setuserNameError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const onSubmit = () => {
    setIsSubmitted(true);

    if (username.trim() === '') setuserNameError(true);
    if (password.trim() === '') setpasswordError(true);

    if (username === adminUsername && password === adminPassword) {
      setLoginStatus(true);
    } else {
      setLoginError(true)
    }
  };

  return (
    <FormGroup
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 16,
        width: '50%',
        paddingBottom: '2%',
        margin: '30px auto',
      }}
    >
      <h1>Log In</h1>
      <FormControl error={isSubmitted && userNameError}>
        <TextField
          label="Username"
          required
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
            if (userNameError) setuserNameError(false);
          }}
        />
        {userNameError && <FormHelperText>Username is required</FormHelperText>}
      </FormControl>
      <FormControl error={isSubmitted && passwordError}>
        <TextField
          type="password"
          label="Password"
          required
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setpasswordError(false);
          }}
        />
        {passwordError && <FormHelperText>Password is required</FormHelperText>}
        {loginError && <FormHelperText error>Your Username or Password was incorrect</FormHelperText>}
      </FormControl>
      <Button variant="contained" onClick={onSubmit}>
        Submit
      </Button>
    </FormGroup>
  );
};
