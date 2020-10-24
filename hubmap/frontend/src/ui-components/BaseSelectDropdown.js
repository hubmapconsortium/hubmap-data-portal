import React from 'react';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import PubSub from 'pubsub-js';
import BaseChildDropdown from './SubMenuOptions';
import { selectDropdownTheme, MenuProps } from './styles';
import * as Commons from '../commons';

export default class CustomSelectMenu extends React.Component {
  constructor(props) {
    super(props);
    const defaultList = [];
    Object.keys(props.menuSections).forEach((key) => {
      Object.values(props.menuSections[key]).forEach((menuItem) => (defaultList.push({ name: `${key}_${menuItem}`, checked: false })));
    });
    this.state = {
      menuItem: '',
      selectedMenuSummary: [],
      menuItems: defaultList,
    };
    this.checkedMenuSubscribertoken = '';
    this.uncheckedMenuSubscribertoken = '';
  }

  onMenuOptionsChanged = (msg, summary) => {
    const { selectedMenuSummary, menuItems } = this.state;
    const index = menuItems.findIndex((menuItem) => menuItem.name === summary);
    if (msg === Commons.CHECKED_MENU_OPTIONS
        && index > -1) {
      menuItems[index].checked = true;
      selectedMenuSummary.push({ name: summary, checked: true });
    } else if (msg === Commons.UNCHECKED_MENU_OPTIONS
        && index > 0) {
      menuItems[index].checked = false;
      selectedMenuSummary.splice(selectedMenuSummary
        .findIndex((menuItem) => menuItem.name === summary), 1);
    }
    this.setState((state) => ({
      ...state,
      menuItems,
    }));
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
    const { selectedMenuSummary } = this.state;
    const keys = [];
    const htmlElements = Object.keys(menuSections).map((key) => {
      keys.push(key);
      return (
        <BaseChildDropdown
          menuItems={menuSections[key]}
          menuName={key}
          selectedMenuSummary={selectedMenuSummary}
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
            this.setState((state) => ({ ...state, menuItem: event.target.value }));
          }}
          input={<Input id="select-multiple-placeholder" />}
          renderValue={() => (menuName)}
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
  menuSections: PropTypes.shape({}),
  menuName: PropTypes.string,
};
