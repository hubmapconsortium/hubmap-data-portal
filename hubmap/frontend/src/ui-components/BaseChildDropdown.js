import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { Checkbox } from '@material-ui/core';
import { grey, blueGrey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: 36,
    right: 0,
    left: 0,
    backgroundColor: '#eeeeee',
    marginTop: 30,
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

export default class BaseChildDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuitems: {},
      menuname:'',
      selectedMenu: '',
    };
  }

  handleChange = (name) => (event) => {
    const { selectedMenu } = this.state;
    this.setState({ selectedMenu: event.target.checked });
  };

  render() {
    const { menuitems, menuname } = this.props;
    return (
          <Grid item xs={3} >
        <FormControl component="fieldset" className={useStyles.formControl}>
          <FormLabel component="label" color={grey[400]}>{menuname}</FormLabel>
            <FormGroup>
                  { menuitems ? menuitems.slice(0,menuitems.length).map((menuitem) => {
                      return (
                        
                      <FormControlLabel key={menuitem}
                        control={<GreyCheckbox onChange={this.handleChange(menuitem)} value={menuitem} key={menuitem} />}
                        label={menuitem}
                    />)
                  }) : null}
                  
        </FormGroup>
        </FormControl>
        </Grid>
    );
  }
}

BaseChildDropdown.propTypes = {
    menuitems: PropTypes.array,
    menuname: PropTypes.string,
  };
  BaseChildDropdown.defaultProps = {
    menuitems: {},
    menuname: '',
  };
  