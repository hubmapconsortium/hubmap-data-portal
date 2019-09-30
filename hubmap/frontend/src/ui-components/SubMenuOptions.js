/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { Checkbox } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import PubSub from 'pubsub-js';
import * as Commons from '../commons';

const useStyles = makeStyles(() => ({
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
// eslint-disable-next-line no-var
var selectedValue = [];

export default class BaseChildDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedMenu: '',
      checked: false,
    };
  }

  handleChange = (menuname) => (event) => {
    const menuNameValue = `${menuname}:${event.target.value}`;
    if (event.target.checked) {
      selectedValue.push(menuNameValue);
      PubSub.publish(Commons.CHECKED_MENU_OPTIONS, menuNameValue);
    } else {
      const index = selectedValue.indexOf(menuNameValue);
      if (index > -1) {
        selectedValue.splice(index, 1);
        PubSub.publish(Commons.UNCHECKED_MENU_OPTIONS, menuNameValue);
      }
    }
    this.setState({
      checkedMenu: menuNameValue,
      checked: event.target.checked,
    });
  };

  render() {
    const { menuitems, menuname, selectedMenu } = this.props;
    const { checkedMenu, checked } = this.state;
    return (
      <FormControl component="fieldset" className={useStyles.formControl} style={{ padding: '10px' }}>
        <FormLabel
          component="label"
          color={grey[800]}
          style={{
            fontSize: '16px', padding: '10px', fontWeight: 'bold', margin: '10px',
          }}
        >{menuname}
        </FormLabel>
        <FormGroup>
          { menuitems ? menuitems.slice(0, menuitems.length).map((menuitem) => {
            let isChecked = false;
            if (checkedMenu.includes(`${menuname}:${menuitem}`)
            && !selectedValue.includes(`${menuname}:${menuitem}`)) {
              isChecked = checked;
            } else if (selectedValue.includes(`${menuname}:${menuitem}`)) {
              isChecked = true;
            }

            return (
              <FormControlLabel
                key={menuitem}
                control={(
                  <GreyCheckbox
                    onChange={this.handleChange(menuname)}
                    value={menuitem}
                    key={menuitem}
                    checked={isChecked}
                  />
                    )}
                label={menuitem}
              />
            );
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
