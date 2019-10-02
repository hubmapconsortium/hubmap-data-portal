/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import PubSub from 'pubsub-js';
import BaseChildDropdown from './SubMenuOptions';
import { selectDropdownTheme, MenuProps } from './styles';
import * as Commons from '../commons';

// eslint-disable-next-line prefer-const
let selectedMenuSummary = [];

export default class CustomSelectMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItem: '',
    };
    this.checkedMenuSubscribertoken = '';
    this.uncheckedMenuSubscribertoken = '';
    this.selectedMenuSummary = [];
  }

  onMenuOptionsChanged = (msg, summary) => {
    const index = selectedMenuSummary.indexOf(summary);
    if (msg === Commons.CHECKED_MENU_OPTIONS
        && index >= -1) {
      selectedMenuSummary.push(summary);
    } else if (msg === Commons.UNCHECKED_MENU_OPTIONS
        && index > 0) {
      selectedMenuSummary.splice(index, 1);
    }
  }

  componentWillMount() {
    this.checkedMenuSubscribertoken = PubSub
      .subscribe(Commons.CHECKED_MENU_OPTIONS, this.onMenuOptionsChanged.bind(this));
    this.uncheckedMenuSubscribertoken = PubSub
      .subscribe(Commons.UNCHECKED_MENU_OPTIONS, this.onMenuOptionsChanged.bind(this));
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.checkedMenuSubscribertoken);
    PubSub.unsubscribe(this.uncheckedMenuSubscribertoken);
  }

  render() {
    const { menuSections, menuName } = this.props;
    const keys = [];
    const values = [];
    const htmlElements = Object.keys(menuSections).map((key) => {
      keys.push(key);
      values.push(menuSections[key]);
      return (
        <BaseChildDropdown
          menuItems={menuSections[key]}
          menuName={key}
          selectedMenu={selectedMenuSummary}
        />
      );
    });

    return (
      <MuiThemeProvider theme={selectDropdownTheme}>
        <Select
          multiple
          value={keys}
          name={menuName}
          onChange={(event) => {
            event.persist();
            this.setState({ ...this.state, menuItem: event.target.value });
          }}
          input={<Input id="select-multiple-placeholder" />}
          // eslint-disable-next-line react/destructuring-assignment
          renderValue={() => (this.props.menuName)}
          MenuProps={MenuProps}
          variant="outlined"
        >
          {htmlElements}
        </Select>
      </MuiThemeProvider>
    );
  }
}

CustomSelectMenu.defaultProps = {
  menuSections: {},
  menuName: 'Menu',
};
CustomSelectMenu.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  menuSections: PropTypes.array,
  menuName: PropTypes.string,
};
