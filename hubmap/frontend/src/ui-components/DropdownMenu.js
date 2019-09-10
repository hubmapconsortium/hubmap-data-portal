/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { List, ListItem, ListItemText } from '@material-ui/core';
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
import Select from '@material-ui/core/Select';

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
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
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
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleMenuItemClick(event) {
    console.log(event.currentTarget, event.target.outerText);
    // add Chip to Browse data page
    // filter data in ExperimentTables
    // show a one-line summary on Browse page
  }

    menuitems = this.state;

    render() {
      const { anchorEl, open } = this.state;
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
