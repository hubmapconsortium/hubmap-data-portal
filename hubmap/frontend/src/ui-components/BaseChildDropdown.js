import React from 'react';
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
})((props) => <Checkbox color="default" {...props} />);
let selectedValue = [];

export default class BaseChildDropdown extends React.Component {
    pubsubObj = null;

    constructor(props) {
      super(props);
      this.state = {
        menuname: '',
        selectedMenu: '',
      };
      this.pubsubObj = new PubSubApi();
    }

  handleChange = (name) => (event) => {
    const { menuname, selectedMenu } = this.props;
    if (selectedMenu !== '') {
      selectedValue.push(selectedMenu);
    }
    event.target.checked = !event.target.checked;
    selectedValue.push(`${event.target.value}`);
    this.setState({ selectedMenu: selectedValue });
    this.pubsubObj.publish(Commons.SELECTED_MENU_OPTIONS, `${menuname, event.target.key}:${event.target.value}`);
  };

  render() {
    const { menuitems, menuname, selectedMenu } = this.props;
    return (
        <FormControl component="fieldset" className={useStyles.formControl} style={{padding: '10px'}}>
          <FormLabel component="label" color={grey[800]} style={{fontSize: '16px', padding: '10px', fontWeight: 'bold', margin: '10px'}} >{menuname}</FormLabel>
            <FormGroup>
                  { menuitems ? menuitems.slice(0,menuitems.length).map((menuitem) => {
                    var isChecked = false;
                    selectedValue.indexOf(menuitem) !== -1 && selectedMenu.indexOf(menuname+ ':'+menuitem) ? isChecked = true : isChecked = false;

                    console.log(selectedValue, isChecked, menuitem,selectedMenu, menuname,selectedMenu.indexOf(menuname+ ':'+menuitem) );
                    return (
                      <FormControlLabel key={menuitem}
                        control={<GreyCheckbox onChange={this.handleChange(menuitem)}
                            value={menuitem} key={menuitem} checked={isChecked}/>}
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
