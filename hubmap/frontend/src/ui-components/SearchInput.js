import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({});
theme.overrides = {
  MuiOutlinedInput: {
    root: {
      '&$focused $notchedOutline': {
        borderColor: blue[500],
        borderWidth: 1,
        fontColor: 'black',
        fontSize: '18px',
      },
      '&:hover': {
        borderColor: blue[500],
        borderWidth: 1,
      },
      height: 50,
    },
  },
  MuiFormLabel: {
    root: {
      color: grey[800],
      fontSize: '18px',
    },
    focused: {
      '&$focused': {
        color: grey[800],
        fontSize: '18px',
      },
    },
  },
};

function CustomSearchInput() {
  return (
    <MuiThemeProvider theme={theme}>
      <TextField
        label="Search"
        variant="outlined"
      />
    </MuiThemeProvider>
  );
}

export default CustomSearchInput;
