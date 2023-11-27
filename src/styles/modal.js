import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Colors } from './theme';

export const ModalContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 20,
  padding: '1rem 1.5rem',
  backgroundColor: Colors.white,
  borderRadius: '1rem',
}));
