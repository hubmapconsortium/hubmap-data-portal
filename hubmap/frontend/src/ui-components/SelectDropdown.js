import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      // flexWrap: 'wrap',
    },
    formControl: {
      // margin: theme.spacing(1),
      width: 200,
      fullWidth: true,
      borderColor: blue[500],
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
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        //width: 300,
        variant: 'outlined',
      },
    },
  };

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
  
export default class SelectDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuitem: '',
            menuname: '',
        };
      }

    render() {
        const { menuitems, menuname } = this.props;
        return(
          
              <MuiThemeProvider theme={theme}>
            <Select
            single
            value={menuitems[1]}
            name={menuname}
            onChange={(event) => {
                event.persist(); // allow native event access (see: https://facebook.github.io/react/docs/events.html)-              // give react a function to set the state asynchronously.
                // here it's using the "name" value set on the TextField
                // to set state.person.[firstname|lastname]. event.target.name
                // required for showing animation
                console.log(event.target.value);
                this.setState({ ...this.state, menuitem: event.target.value });
              }}
            input={<Input id="select-multiple-placeholder" />}
            renderValue={(selected) => (selected.lenghth > 0 ? selected[1] : this.state.menuitem)}
            //MenuProps={MenuProps}
            variant='outlined'
            >
              <MenuItem disabled value={menuitems[0]} selected>
                <em>{menuitems[0]}</em>
              </MenuItem>
            {menuitems.slice(1,menuitems.lenghth).map((menuitem) => (
                <MenuItem key={menuitem} value={menuitem}>
                  {menuitem}
                </MenuItem>
              ))}
          </Select>
          </MuiThemeProvider>
      );
    }
}

SelectDropdown.defaultProps = {
    menuitems: ['empty'],
    menuname: 'Menu',
  };
  SelectDropdown.propTypes = {
    menuitems: PropTypes.array,
    menuname: PropTypes.string,
  };
