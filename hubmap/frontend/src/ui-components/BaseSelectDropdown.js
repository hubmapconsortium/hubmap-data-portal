/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import PubSub from 'pubsub-js';
import BaseChildDropdown from './SubMenuOptions';
import * as Commons from '../commons';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 228,
      margin: '10px',
      padding: '35px',
    },
  },
};

const theme = createMuiTheme({});
theme.overrides = {
  MuiOutlinedInput: {
    root: {
      '&$focused $notchedOutline': {
        borderColor: blue[500],
        borderWidth: 1,
        fontColor: 'black',
        fontSize: '18px',
      },
      '&:hover': {
        borderColor: blue[500],
        borderWidth: 1,
      },
      height: 50,
      width: 300,
    },
  },
  MuiFormLabel: {
    root: {
      fontSize: '18px',
    },
    focused: {
      '&$focused': {
        color: grey[500],
        fontSize: '18px',
      },
    },
  },
};
// eslint-disable-next-line prefer-const
let selectedMenuSummary = [];

export default class CustomSelectMenu extends React.Component {
  menutoken = '';

  constructor(props) {
    super(props);
    this.state = {
      menuitem: '',
      menuname: '',
    };
  }

  selectedMenuSummaryAdded = (msg, summary) => {
    if (msg === Commons.CHECKED_MENU_OPTIONS
        && selectedMenuSummary.indexOf(summary) === -1) {
      selectedMenuSummary.push(summary);
    }
    if (msg === Commons.UNCHECKED_MENU_OPTIONS
        && selectedMenuSummary.indexOf(summary) === -1) {
      const index = selectedMenuSummary.indexOf(summary);
      if (index > -1) {
        selectedMenuSummary.splice(index, 1);
      }
    }
  }

  componentWillMount() {
    this.menutoken = PubSub
      .subscribe(Commons.CHECKED_MENU_OPTIONS, this.selectedMenuSummaryAdded.bind(this));
  }

  render() {
    const { menuSections, menuName } = this.props;
    const htmlElements = [];
    const keys = [];
    const values = [];
    Object.keys(menuSections).forEach((key) => {
      keys.push(key);
      values.push(menuSections[key]);
      htmlElements.push(
        <BaseChildDropdown
          menuItems={menuSections[key]}
          menuName={key}
          selectedMenu={selectedMenuSummary}
        />,
      );
    });

    return (

      <MuiThemeProvider theme={theme}>
        <Select
          multiple
          value={keys}
          name={menuName}
          onChange={(event) => {
            event.persist();
            this.setState({ ...this.state, menuitem: event.target.value });
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
