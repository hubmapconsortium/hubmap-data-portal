/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
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
    const defaultList = Object.values(props.menuItems).map((menuItem) => ({ name: `${props.menuName}_${menuItem}`, checked: false }));
    this.state = {
      checkedMenu: '',
      checked: false,
      listStatus: defaultList,
    };
  }

  handleChange = (menuName) => (event) => {
    const menuNameValue = `${menuName}_${event.target.value}`;
    const isChecked = event.target.checked;
    const { listStatus } = this.state;
    if (event.target.checked) {
      listStatus.findIndex(menuNameValue);
      PubSub.publish(Commons.CHECKED_MENU_OPTIONS, menuNameValue);
    } else {
      const isMenuChecked = listStatus[menuNameValue];
      if (isMenuChecked) {
        listStatus[menuNameValue] = false;
        PubSub.publish(Commons.UNCHECKED_MENU_OPTIONS, menuNameValue);
      }
    }
    this.setState((state) => ({
      ...state,
      checkedMenu: menuNameValue,
      checked: isChecked,
      listChecked: state.listStatus,
    }));
  };

  componentWillMount() {
    this.setState((state) => ({
      ...state,
    }));
  }

  render() {
    const { menuItems, menuName, selectedMenu } = this.props;
    const { checkedMenu, checked, listStatus } = this.state;
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
          {menuItems.map((menuItem) => {
            let isChecked = false;
            const changedValue = `${menuName}:${menuItem}`;
            const isUnchecked = !listStatus[changedValue];
            if (checkedMenu.includes(changedValue)
            && !isUnchecked) {
              isChecked = checked;
            } else if (isUnchecked) {
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
          })}

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
