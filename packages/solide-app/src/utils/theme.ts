import { createTheme } from '@mui/material';
import { blueGrey, orange, grey } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    // mode: 'dark',
    primary: {
      main: grey[900],
    },
    secondary: {
      main: grey[800],
    },
    text: {
      primary: grey[100],
      secondary: grey[400],
    },
  },
  status: {
    danger: orange[500],
  },
});

export { theme };
