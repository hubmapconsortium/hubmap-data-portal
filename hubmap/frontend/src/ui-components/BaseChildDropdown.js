import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { Checkbox } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { PubSubApi } from '../middleware';
import * as Commons from '../commons';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: 36,
    right: 0,
    left: 0,
    //backgroundColor: '#eeeeee',
    marginTop: 30,
  },
}));
const GreyCheckbox = withStyles({
  root: {
    color: grey[400],
    '&$checked': {
      color: grey[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
let selectedValue = [];

export default class BaseChildDropdown extends React.Component {
    pubsubObj = null;
    constructor(props) {
      super(props);
      this.state = {
        menuitems: {},
        menuname: '',
        selectedMenu: '',
      };
      this.pubsubObj = new PubSubApi();
    }

  handleChange = (name) => (event) => {

    const { menuname, selectedMenu } = this.props;
    if (selectedMenu !== ""){
      selectedValue.push(selectedMenu);
    }
    selectedValue.push(`${event.target.value}`);
    this.setState({ selectedMenu: selectedValue });
    this.pubsubObj.publish(Commons.SELECTED_MENU_OPTIONS, `${menuname} :${event.target.value}`);
  };

  render() {
    const { menuitems, menuname } = this.props;
    return (
        <FormControl component="fieldset" className={useStyles.formControl} style={{padding: '10px'}}>
          <FormLabel component="label" color={grey[800]} style={{fontSize: '18px', padding: '10px', fontWeight: 'bold', margin: '10px'}} >{menuname}</FormLabel>
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
    );
  }
}

BaseChildDropdown.propTypes = {
  menuitems: PropTypes.array,
  menuname: PropTypes.string,
  selectedMenu: PropTypes.string,
};
BaseChildDropdown.defaultProps = {
  menuitems: {},
  menuname: '',
  selectedMenu: '',
};
