/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import BaseChildDropdown from './SubMenuOptions';
import { PubSubApi } from '../middleware';
import * as Commons from '../commons';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 12;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 300,
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
      // color: grey[800],
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

  pubsubObj = null;

  constructor(props) {
    super(props);
    this.state = {
      menuitem: '',
      menuname: '',
    };
    this.pubsubObj = new PubSubApi();
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
    this.menutoken = this.pubsubObj
      .subscribe(Commons.CHECKED_MENU_OPTIONS, this.selectedMenuSummaryAdded.bind(this));
  }

  render() {
    const { menusections, menuname } = this.props;
    const htmlElements = [];
    const keys = [];
    const values = [];
    Object.keys(menusections).forEach((key) => {
      keys.push(key);
      values.push(menusections[key]);
      htmlElements.push(
        <BaseChildDropdown
          menuitems={menusections[key]}
          menuname={key}
          selectedMenu={selectedMenuSummary}
        />,
      );
    });

    return (

      <MuiThemeProvider theme={theme}>
        <Select
          multiple
          value={keys}
          name={menuname}
          onChange={(event) => {
            event.persist();
            this.setState({ ...this.state, menuitem: event.target.value });
          }}
          input={<Input id="select-multiple-placeholder" />}
          // eslint-disable-next-line react/destructuring-assignment
          renderValue={() => (this.props.menuname)}
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
  menusections: {},
  menuname: 'Menu',
};
CustomSelectMenu.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  menusections: PropTypes.array,
  menuname: PropTypes.string,
};
