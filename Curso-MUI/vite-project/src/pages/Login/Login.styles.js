import { styled, keyframes, alpha, Box, Paper, TextField, Button, FormControlLabel, Link } from '@mui/material';

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const slideOutLeft = keyframes`
  from {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(-50px) scale(0.95);
  }
`;

export const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

export const BackgroundBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: theme.palette.background.default,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
}));

export const LoginPaper = styled(Paper)(({ theme, isExiting }) => ({
  width: '100%',
  maxWidth: 420,
  padding: '2.5rem 2.5rem',
  borderRadius: 16,
  animation: isExiting 
    ? `${slideOutLeft} 0.4s ease-in forwards`
    : `${fadeIn} 0.4s ease-out`,
  position: 'relative',
  zIndex: 10,
  background: theme.palette.background.paper,
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
  
  '@media (max-width: 768px)': {
    maxWidth: '90%',
    padding: '2rem 1.5rem',
  },
  
  '@media (max-height: 900px)': {
    padding: '2rem 2rem',
    maxHeight: '85vh',
  },
  
  '@media (max-height: 750px)': {
    padding: '1.5rem 2rem',
    maxHeight: '90vh',
  },
  
  '@media (max-height: 650px)': {
    padding: '1.25rem 1.75rem',
    maxHeight: '95vh',
  },
}));

export const WelcomePaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 420,
  padding: '3rem 2.5rem',
  borderRadius: 16,
  animation: `${slideInRight} 0.4s ease-out`,
  position: 'relative',
  zIndex: 10,
  background: theme.palette.background.paper,
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
  
  '@media (max-width: 768px)': {
    maxWidth: '90%',
    padding: '2.5rem 1.5rem',
  },
}));

export const LogoBox = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  background: theme.palette.primary.main,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 1.25rem',
  '& svg': {
    fontSize: '1.75rem',
    color: theme.palette.primary.contrastText,
  },
  
  '@media (max-height: 750px)': {
    width: 56,
    height: 56,
    margin: '0 auto 1rem',
    '& svg': {
      fontSize: '1.5rem',
    },
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: alpha(theme.palette.secondary.dark, 0.3),
    color: theme.palette.text.secondary,
    borderRadius: 8,
    transition: 'all 0.2s ease',
    '& fieldset': {
      borderColor: alpha(theme.palette.secondary.main, 0.3),
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.secondary.dark, 0.4),
      '& fieldset': {
        borderColor: alpha(theme.palette.secondary.main, 0.5),
      },
    },
    '&.Mui-focused': {
      backgroundColor: alpha(theme.palette.secondary.dark, 0.5),
      '& fieldset': {
        borderColor: theme.palette.secondary.main,
        borderWidth: '1px',
      },
    },
    '& input': {
      color: theme.palette.text.primary,
      fontSize: '0.95rem',
      padding: '0.75rem 0.875rem',
      '&::placeholder': {
        color: alpha(theme.palette.text.secondary, 0.5),
        opacity: 1,
      },
      '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
        WebkitBoxShadow: '0 0 0 100px transparent inset !important',
        WebkitTextFillColor: `${theme.palette.text.primary} !important`,
        transition: 'background-color 5000s ease-in-out 0s',
        caretColor: theme.palette.text.primary,
      },
      '&:-moz-autofill, &:-moz-autofill:hover, &:-moz-autofill:focus': {
        backgroundColor: 'transparent !important',
        color: `${theme.palette.text.primary} !important`,
        filter: 'none !important',
      },
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    fontSize: '0.95rem',
    fontWeight: 600,
    '&.Mui-focused': {
      color: theme.palette.text.secondary,
    },
  },
  '& .MuiInputAdornment-root svg': {
    color: alpha(theme.palette.text.secondary, 0.6),
    fontSize: '1.25rem',
  },
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  padding: '0.875rem',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: 8,
  boxShadow: 'none',
  '&:hover': {
    background: theme.palette.primary.dark,
    boxShadow: 'none',
  },
  '&:active': {
    background: theme.palette.primary.dark,
  },
  '&.Mui-disabled': {
    background: alpha(theme.palette.primary.main, 0.5),
    color: alpha(theme.palette.primary.contrastText, 0.5),
  },
}));

export const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  '& .MuiCheckbox-root': {
    color: alpha(theme.palette.text.secondary, 0.5),
    padding: '6px',
    '&.Mui-checked': {
      color: theme.palette.secondary.main,
    },
    '&.Mui-disabled': {
      color: alpha(theme.palette.text.secondary, 0.3),
    },
  },
  '& .MuiTypography-root': {
    color: alpha(theme.palette.text.secondary, 0.8),
    fontSize: '0.9rem',
  },
  '&.Mui-disabled .MuiTypography-root': {
    color: alpha(theme.palette.text.secondary, 0.6),
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: '0.9rem',
  fontWeight: 500,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export const CheckIconBox = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  background: theme.palette.success.main,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 1.5rem',
  '& svg': {
    fontSize: '3rem',
    color: theme.palette.primary.contrastText,
  },
}));

export const LoadingDot = styled(Box)(({ theme, delay }) => ({
  width: 6,
  height: 6,
  background: theme.palette.secondary.main,
  borderRadius: '50%',
  animation: 'pulse 1.2s ease-in-out infinite',
  animationDelay: `${delay}s`,
  '@keyframes pulse': {
    '0%, 100%': {
      opacity: 0.4,
      transform: 'scale(1)',
    },
    '50%': {
      opacity: 1,
      transform: 'scale(1.2)',
    },
  },
}));