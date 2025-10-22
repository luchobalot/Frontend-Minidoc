import React from 'react';
import { Container } from '@mui/material';
import { BackgroundBox, LoginPaper } from './Login.styles';
import { LoginHeader } from './LoginHeader';
import { LoginForm } from './LoginForm';
import { LoginFooter } from './LoginFooter';
import { useLogin } from './useLogin';

function Login() {
  const {
    formData,
    showPassword,
    isLoading,
    errorMessage,
    loginSuccess,
    isExiting,
    setShowPassword,
    handleInputChange,
    handleSubmit,
  } = useLogin();

  return (
    <BackgroundBox>
      <Container 
        maxWidth="sm" 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '100vh',
          py: 2,
        }}
      >
        {!loginSuccess ? (
          <LoginPaper elevation={0} isExiting={isExiting}>
            <LoginHeader />
            
            <LoginForm
              formData={formData}
              showPassword={showPassword}
              isLoading={isLoading}
              errorMessage={errorMessage}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />
            
            <LoginFooter />
          </LoginPaper>
        ) : null}
        
        {/* Animacion de bienvenida comentada temporalmente
        {loginSuccess && <WelcomeScreen userData={userData} />}
        */}
      </Container>
    </BackgroundBox>
  );
}

export default Login;