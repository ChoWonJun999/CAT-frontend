import * as React from 'react';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    black: {
      main: '#000000',
      light: '#333333',
      dark: '#000000',
      contrastText: '#fff',
    },
    darkGray: {
      main: '#2F4F4F',
      light: '#708090',
      dark: '#1C1C1C',
      contrastText: '#fff',
    },
    upbitBlue: {
      light: '#6BB9FF',
      main: '#1E8CFF',
      dark: '#005BBB',
      contrastText: '#fff',
    },
    upbitDarkBlue: {
      light: '#4A77CC',
      main: '#0045B5',
      dark: '#002A80',
      contrastText: '#fff',
    },
  },
});

export default function MyButton(props) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={() => (
        <ThemeProvider theme={theme}>
          <Button
            type={props.type}
            id={props.id}
            name={props.tagName}
            className={props.className}
            sx={{
              width: props.width || '10%',
              margin: props.margin || '1em 0 0 1em',
              borderRadius: props.borderRadius || '13px',
              border: props.border || 'solid 1px',
              borderColor: props.borderColor || '#000',
            }}
            color={props.color}
            variant="contained"
            onClick={props.onClick}
            selected
          >
            <div style={{ fontSize: props.fontSize || '' }}>{props.value}</div>
          </Button>
        </ThemeProvider>
      )}
    />
  );
}
