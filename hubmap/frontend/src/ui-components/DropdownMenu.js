/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { List, ListItem, ListItemText, Paper, Checkbox, TextField, FormLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import Chip from './Chip';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #eeeeee',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const { open } = this.state;
    this.setState({
      anchorEl: event.currentTarget,
      open: !open,
      gilad: true,
      jason: false,
      antoine: false,
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

   handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };


  handleMenuItemClick(event) {
    console.log(event.currentTarget, event.target.outerText);
    // add Chip to Browse data page
    // filter data in ExperimentTables
    // show a one-line summary on Browse page
  }

    menuitems = this.state;

    render() {
      const { anchorEl, open,  gilad, jason, antoine  } = this.state;
      const { menuitems, menuname } = this.props;
      return (
        <div>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="#f5f5f5"
            onClick={this.handleClick}
          >
            {menuname}
          </Button>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClick={this.handleClick}
            onClose={this.handleClose}>
            <MenuItem key={menuitems[0]} disabled>
              {menuitems[0]}
            </MenuItem>
            { menuitems ? menuitems.slice(1,menuitems.length).map((menuitem) => (
              <MenuItem key={menuitem} onClick={this.handleMenuItemClick}>
                {menuitem}
              </MenuItem>
            ))
              : ''};

                  <Paper>
                  <FormControl component="fieldset" className={useStyles.formControl}>
                        <FormLabel component="legend">Assign responsibility</FormLabel>
                        <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={gilad} onChange={this.handleChange('gilad')} value="gilad" />}
                            label="Gilad Gray"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={jason} onChange={this.handleChange('jason')} value="jason" />}
                            label="Jason Killian"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox checked={antoine} onChange={this.handleChange('antoine')} value="antoine" />
                            }
                            label="Antoine Llorca"
                        />
                        </FormGroup>
                        <FormHelperText>**</FormHelperText>
                    </FormControl>
                  </Paper>
          </StyledMenu>
        </div>
      );
    }
}
DropdownMenu.defaultProps = {
  menuitems: ['empty'],
  menuname: 'Menu'
};
DropdownMenu.propTypes = {
  menuitems: PropTypes.array,
  menuname: PropTypes.string,
};
