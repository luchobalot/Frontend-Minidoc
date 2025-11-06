import { styled } from '@mui/material/styles';
import { Box, Button, TextField, Select, FormControlLabel, Switch } from '@mui/material';

export const FormContainer = styled(Box)({
  padding: '32px',
  border: '1px solid #E5E7EB',
  borderRadius: '12px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  maxWidth: '900px',
  margin: '0 auto',
});

export const StepperContainer = styled(Box)({
  marginBottom: '32px',
  padding: '16px',
  backgroundColor: '#F9FAFB',
  borderRadius: '8px',
});

export const FormField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#FAFBFC',
    '& fieldset': {
      borderColor: '#E5E7EB',
    },
    '&:hover fieldset': {
      borderColor: '#D1D5DB',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3B82F6',
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#6B7280',
    '&.Mui-focused': {
      color: '#3B82F6',
    },
  },
});

export const SelectField = styled(Select)({
  backgroundColor: '#FAFBFC',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#E5E7EB',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#D1D5DB',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#3B82F6',
  },
});

export const FormRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
  marginBottom: '16px',

  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
});

export const FormSection = styled(Box)({
  marginBottom: '24px',
});

export const FormSectionTitle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '1.1rem',
  fontWeight: 700,
  color: '#111827',
  marginBottom: '16px',
  paddingBottom: '12px',
  borderBottom: '2px solid #E5E7EB',

  '& svg': {
    fontSize: '24px',
    color: '#3B82F6',
  },
});

export const StepContent = styled(Box)({
  minHeight: '400px',
  marginBottom: '24px',
});

export const CheckboxContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
  padding: '16px',
  backgroundColor: '#F9FAFB',
  borderRadius: '8px',
  border: '1px solid #E5E7EB',
  marginBottom: '16px',

  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
});

export const SwitchContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
  padding: '16px',
  backgroundColor: '#F9FAFB',
  borderRadius: '8px',
  border: '1px solid #E5E7EB',
  marginBottom: '16px',

  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },

  '& .MuiFormControlLabel-root': {
    margin: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
  },
});

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    color: '#D1D5DB',
    '&.Mui-checked': {
      color: '#10B981',
      '& + .MuiSwitch-track': {
        backgroundColor: '#D1FAE5',
      },
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#E5E7EB',
  },
}));

export const ButtonContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
  marginTop: '32px',

  '@media (max-width: 768px)': {
    flexDirection: 'column-reverse',
    marginTop: '24px',

    '& button': {
      width: '100%',
    },
  },
});

export const ActionButton = styled(Button)({
  height: '40px',
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.9rem',
  transition: 'all 0.3s ease',
  minWidth: '120px',

  '&:disabled': {
    backgroundColor: '#F3F4F6',
    color: '#9CA3AF',
  },
});

export const SuccessMessage = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  marginBottom: '16px',
  backgroundColor: '#D1FAE5',
  border: '1px solid #6EE7B7',
  borderRadius: '8px',
  color: '#065F46',
  fontWeight: 600,
  fontSize: '0.9rem',
});

export const ErrorMessage = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  marginBottom: '16px',
  backgroundColor: '#FEE2E2',
  border: '1px solid #FCA5A5',
  borderRadius: '8px',
  color: '#991B1B',
  fontWeight: 600,
  fontSize: '0.9rem',
});

export const InfoBox = styled(Box)({
  display: 'flex',
  gap: '12px',
  padding: '12px',
  backgroundColor: '#EFF6FF',
  border: '1px solid #BFDBFE',
  borderRadius: '8px',
  marginTop: '12px',

  '& svg': {
    color: '#3B82F6',
    flexShrink: 0,
  },
});