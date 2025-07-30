import React, { useState } from 'react';
import { StyledButton, StyledTextField, LoginContainer, StyledAlert } from './styles';

const Login: React.FC = () => {
  const [nuid, setNuid] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [nominationsCount, setNominationsCount] = useState<number | null>(null);

  const handleLogin = async () => {
    if (!nuid.trim()) {
      setError('NUID cannot be empty.');
      return;
    }

    try {
      setError(null);

      const response = await fetch('/nominations/${nuid}');
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const count = await response.json();
      setNominationsCount(count);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch nominations. Please try again.');
    }
  };
  
  return (
    <LoginContainer>
      <h1>Login</h1>
      <p>Enter your NUID to log in and see your nominations.</p>

      <StyledTextField
        label="NUID"
        variant="outlined"
        value={nuid}
        onChange={(e) => setNuid(e.target.value)}
      />

      <StyledButton
        variant="contained"
        color="primary"
        onClick={handleLogin}
      >
        Login
      </StyledButton>

      {error && <StyledAlert severity="error">{error}</StyledAlert>}

      {nominationsCount !== null && (
        <StyledAlert severity="success">
          You have {nominationsCount} approved nominations!
        </StyledAlert>
      )}
    </LoginContainer>
  );
};

export default Login;
