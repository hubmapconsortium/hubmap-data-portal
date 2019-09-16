import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import BaseChildDropdown from '../ui-components/BaseChildDropdown';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // flexWrap: 'wrap',
  },
  formControl: {
    // margin: theme.spacing(1),
    width: 200,
    fullWidth: true,
    borderColor: grey[500],
    borderWidth: 1,
    fontColor: 'black',
    fontSize: '18px',
    // display: 'flex',
    // wrap: 'nowrap',
  },
  chips: {
    display: 'flex',
    // flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    // marginTop: theme.spacing(3),
  },
}));
  
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 12;
const MenuProps = {
  PaperProps: {
    style: {
       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 300,
      margin: '10px',
      padding: '35px',
    },
  },
};

const theme = createMuiTheme({});
theme.overrides = {
  MuiOutlinedInput: {
    root: {
      '&$focused $notchedOutline': {
        borderColor: grey[500],
        borderWidth: 1,
        fontColor: 'black',
        fontSize: '18px',
      },
      height: 50,
      width: 300,
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
        fontSize: "18px",
      },
    },
  },
};

export default class CustomSelectMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuitem: '',
      menuname: '',
    };
  }

  render() {
    const { menusections, menuname } = this.props;
    const htmlElements = [];

    console.log(menuname);
    for (const key in menusections) {
        console.log(menusections[key], key);
        htmlElements.push(             
          <BaseChildDropdown
          menuitems={menusections[key]}
          menuname={key}
        />
        );
      }
    return(
          
              <MuiThemeProvider theme={theme}>
            <Select
              single
              value={menuname}
              name={menuname}
              onChange={(event) => {
                event.persist();
                console.log(event.target.value);
                this.setState({ ...this.state, menuitem: event.target.value });
              }}
              input={<Input id="select-multiple-placeholder" />}
              renderValue={(selected) => (this.props.menuname)}
            MenuProps={MenuProps}
              variant='outlined'
            >
             
            {htmlElements}

          </Select>
          {console.log(document.getSelection(menuname))}
          </MuiThemeProvider>
    );
  }
}

CustomSelectMenu.defaultProps = {
  menusections: {},
  menuname: 'Menu',
};
CustomSelectMenu.propTypes = {
  menusections: PropTypes.array,
  menuname: PropTypes.string,
};
