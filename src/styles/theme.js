import { createTheme } from '@mui/material';

export const Colors = {
  primary: '#272643',
  primaryLight: '#312e52',
  primaryDark: '#232138',

  secondary: '#d0f5f5',
  secondaryLight: '#e3f6f5',
  secondaryDark: '#2c698d',

  white: '#fff',
  black: '#151621',
  grayLight: '#e4e4e4',
  grayDark: '#adadad',
  grayDark2: '#4f4f4f',

  background: '#eeedff',
};

export const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
      light: Colors.primaryLight,
      dark: Colors.primaryDark,
    },
    secondary: {
      main: Colors.secondary,
      light: Colors.secondaryLight,
      dark: Colors.secondaryDark,
    },
  },
});
