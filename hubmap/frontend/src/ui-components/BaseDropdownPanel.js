import React from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { grey, blueGrey } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import { Checkbox } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    top: 36,
    right: 0,
    left: 0,
    backgroundColor: '#eeeeee',
    marginTop: 30,
  },
  formControl: {
    marginTop: 50,
  },
}));

const GreyCheckbox = withStyles({
    root: {
      color: blueGrey[400],
      '&$checked': {
        color: blueGrey[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

export default class BaseDropDownPanel extends React.Component {
  container = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedMenu: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickAway = this.handleClickAway.bind(this);
  }

    handleClick = () => {
      this.setState((state) => ({ open: !state.open }));
    }

    handleClickAway = () => {
      this.setState({ open: false });
    }

    handleChange = (name) => (event) => {
      const { selectedMenu } = this.state;
      this.setState({ selectedMenu: event.target.checked });
    };
    

    render() {
      const { open } = this.state;
      const { menuitems, menuname } = this.props;
      return (
        <div className={useStyles.root} ref={this.container}>
          <ClickAwayListener onClickAway={this.handleClickAway}>
            <div>
              <Button onClick={this.handleClick}>{menuname}</Button>
              {open ? (
                <Paper className={useStyles.paper}>
                  <FormControl component="fieldset" className={useStyles.formControl}>
                   <FormLabel component="label" color={grey[400]}>{menuname}</FormLabel>
                     <FormGroup>
                  { menuitems ? menuitems.slice(0,menuitems.length).map((menuitem) => {
                      return <FormControlLabel  key={menuitem}
                      control={<GreyCheckbox onChange={this.handleChange(menuitem)} value={menuitem}  key={menuitem} />}
                      label={menuitem}
                    />
                  }) : null}
                  
                  </FormGroup>
                <FormHelperText></FormHelperText>
                </FormControl>
                </Paper>
              ) : null}
            </div>
          </ClickAwayListener>
        </div>
      );
    }
}

BaseDropDownPanel.propTypes = {
  menuitems: PropTypes.array,
  menuname: PropTypes.string,
};
BaseDropDownPanel.defaultProps = {
  menuitems: {},
  menuname: '',
};
