import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Colors } from './theme';

export const MyCard = styled(Card)(() => ({
  width: `calc(${100 / 7}%)`,
  minHeight: '7rem',
  fontSize: '1.25rem',
  fontWeight: 600,
  border: `.5px solid ${Colors.grayLight}`,
}));
