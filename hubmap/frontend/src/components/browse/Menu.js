/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from './Chip';

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

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuitems: {},
      anchorEl: null,
      setAnchorEl: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(event) {
    const { setAnchorEl } = this.state;
    setAnchorEl(event.currentTarget);
  }

  handleClose() {
    const { setAnchorEl } = this.state;
    setAnchorEl(null);
  }

  handleMenuItemClick(event) {
    // add Chip to Browse data page
    // filter data in ExperimentTables
    // show a one-line summary on Browse page
  }

    menuitems = this.state;

    render() {
      const { menuitems, anchorEl } = this.state;
      return (
        <div>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="#f5f5f5"
            onClick={this.handleClick}
          >
                    Open Menu
          </Button>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            {menuitems ? menuitems.array.forEach((menuitem) => (
              <StyledMenuItem onSelect={(event) => this.handleMenuItemClick(event)}>
                <ListItemText primary={menuitem} />
              </StyledMenuItem>
            ))
              : ''};
          </StyledMenu>
        </div>
      );
    }
}
