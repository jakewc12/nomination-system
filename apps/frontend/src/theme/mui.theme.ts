import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    background: {
      default: '#d4cbc9',
    },
    primary: {
      main: '#c8102e',
      contrastText: '#fff',
    },
    secondary: {
      main: '#000000',
      light: '#9c9999',
      contrastText: '#fff',
    },
    info: { main: '#29b6f6' },
    warning: { main: '#ff0000' },
    success: { main: '#66bb6a' },
  },
  typography: {
    fontFamily: ['Verdana', 'sans-serif'].join(','),
  },
});
