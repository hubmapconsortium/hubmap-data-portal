/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { grey } from '@material-ui/core/colors';
import PubSub from 'pubsub-js';
import { GreyCheckbox, useStyles } from './styles';
import * as Commons from '../commons';

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
    const { menuItems, menuName, selectedMenu } = this.props;
    const { checkedMenu, checked } = this.state;
    return (
      <FormControl component="fieldset" className={useStyles.formControl} style={{ padding: '10px' }}>
        <FormLabel
          component="label"
          color={grey[800]}
          style={{
            fontSize: '16px', padding: '10px', fontWeight: 'bold', margin: '10px',
          }}
        >{menuName}
        </FormLabel>
        <FormGroup>
          { menuItems ? menuItems.slice(0, menuItems.length).map((menuItem) => {
            let isChecked = false;
            if (checkedMenu.includes(`${menuName}:${menuItem}`)
            && !selectedValue.includes(`${menuName}:${menuItem}`)) {
              isChecked = checked;
            } else if (selectedValue.includes(`${menuName}:${menuItem}`)) {
              isChecked = true;
            }

            return (
              <FormControlLabel
                key={menuItem}
                control={(
                  <GreyCheckbox
                    onChange={this.handleChange(menuName)}
                    value={menuItem}
                    key={menuItem}
                    checked={isChecked}
                  />
                    )}
                label={menuItem}
              />
            );
          }) : null}

        </FormGroup>
      </FormControl>
    );
  }
}

BaseChildDropdown.propTypes = {
  menuItems: PropTypes.array,
  menuName: PropTypes.string,
  selectedMenu: PropTypes.string,
};
BaseChildDropdown.defaultProps = {
  menuItems: {},
  menuName: '',
  selectedMenu: '',
};
