import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

/*const theme = createTheme({
  palette: {
    mode: 'light',
  },
});*/
// In your theme creation (main.tsx)
const theme = createTheme({
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(12, 9, 1, 0.08)',
            '&:hover': {
              backgroundColor: 'rgba(7, 10, 12, 0.12)',
            }
          }
        }
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);