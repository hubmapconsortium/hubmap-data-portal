import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { grey } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    top: 36,
    right: 0,
    left: 0,
  },
  fake: {
    backgroundColor: grey[200],
    height: theme.spacing(1),
    margin: theme.spacing(2),
    // Selects every two elements among any group of siblings.
    '&:nth-child(2n)': {
      marginRight: theme.spacing(3),
    },
  },
}));

export default class BaseDropdownPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: '',
      menuname: '',
      menuitems: {},
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickAway = this.handleClickAway.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
        

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

    handleClick = () => {
      this.setState({
        open: true,
      });
    };

    handleClose = () => {
        this.setState({
          open: false,
        });
      };

    handleClickAway = () => {
      this.setState({
        open: false,
      });
    };


    render() {
      const fake = <div className={useStyles.fake} />;
      const {open, value, menuitems, menuname} = this.state;
      return (
        <div className={useStyles.root}>
            <div>
              <Button onClick={this.handleClick} onClose={this.handleClose}>menu</Button>
              {open ? (
                <Paper className={useStyles.paper}>
                  {fake}
                  {fake}
                  {fake}
                  {fake}
                  {fake}
                  {console.log(open)}
                </Paper>
              ) : null}
            </div>
        </div>
      );
    }
}

BaseDropdownPanel.defaultProps = {
  menuitems: ['empty'],
  menuname: 'Menu',
};
BaseDropdownPanel.propTypes = {
  menuitems: PropTypes.array,
  menuname: PropTypes.string,
};
