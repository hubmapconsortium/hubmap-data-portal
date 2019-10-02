import React from 'react';
import { createMuiTheme, withStyles, makeStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import { Checkbox } from '@material-ui/core';

/** *
 * Define default values here
 */
const defaultFontColor = 'black';
const defaultBorderColor = blue[500];
const selectDropdownFontSize = '18px';
const defaultFormLabelColor = grey[500];
const controlledChipFontSize = '16px';
const controlledChipHeight = 50;
const selectDropdownHeight = 60;
const selectDropdownWidth = 300;
const selectBorderWidth = 1;
const controlledChipBorderWidth = 1;

export const selectDropdownTheme = createMuiTheme({});
selectDropdownTheme.overrides = {
  MuiOutlinedInput: {
    root: {
      '&$focused $notchedOutline': {
        borderColor: defaultBorderColor,
        borderWidth: selectBorderWidth,
        fontColor: defaultFontColor,
        fontSize: selectDropdownFontSize,
      },
      '&:hover': {
        borderColor: defaultBorderColor,
        borderWidth: selectBorderWidth,
      },
      height: selectDropdownHeight,
      width: selectDropdownWidth,
    },
  },
  MuiFormLabel: {
    root: {
      fontSize: selectDropdownFontSize,
    },
    focused: {
      '&$focused': {
        color: defaultFormLabelColor,
        fontSize: selectDropdownFontSize,
      },
    },
  },
};

export const controlledChipInputTheme = createMuiTheme({});
controlledChipInputTheme.overrides = {
  MuiOutlinedInput: {
    root: {
      '&$focused $notchedOutline': {
        borderColor: defaultBorderColor,
        borderWidth: controlledChipBorderWidth,
        fontColor: defaultFontColor,
        fontSize: controlledChipFontSize,
      },
      height: controlledChipHeight,
    },
  },
  MuiFormLabel: {
    root: {
      color: defaultFormLabelColor,
      fontSize: controlledChipFontSize,
    },
    focused: {
      '&$focused': {
        color: defaultFormLabelColor,
        fontSize: controlledChipFontSize,
      },
    },
    color: defaultFormLabelColor,
  },
};

export const GreyCheckbox = withStyles({
  root: {
    color: grey[400],
    '&$checked': {
      color: grey[600],
    },
  },
})((props) => <Checkbox color="default" {...props} />);

export const useStyles = makeStyles(() => ({
  paper: {
    position: 'absolute',
    top: 36,
    right: 0,
    left: 0,
    marginTop: 30,
  },
}));

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 228,
      margin: '10px',
      padding: '35px',
    },
  },
};
