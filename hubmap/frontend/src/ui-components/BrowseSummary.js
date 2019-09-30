/* eslint-disable react/prop-types */
import React from 'react';
import ChipInput from 'material-ui-chip-input';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

import PubSub from 'pubsub-js';
import * as Commons from '../commons';

const theme = createMuiTheme({});
theme.overrides = {
  MuiOutlinedInput: {
    root: {
      '&$focused $notchedOutline': {
        borderColor: blue[500],
        borderWidth: 1,
        fontColor: 'black',
        fontSize: '14px',
      },
      height: 50,
    },
  },
  MuiFormLabel: {
    root: {
      color: grey[800],
      fontSize: '16px',
    },
    focused: {
      '&$focused': {
        color: grey[800],
        fontSize: '16px',
      },
    },
    color: grey[800],
  },
};

export default class SelectedBrowseOptionsSummary extends React.Component {
  summary = '';

  searchtoken = '';

  menutoken = '';

  pubsubObj = null;

  constructor(props) {
    super(props);
    this.pubsubObj = new PubSub();
    this.state = {
      selectedMenuSummary: null,
      typedSearchOptions: null,
      menuSelected: false,
      searchOptions: false,
      chips: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(deletedChip) {
    if (deletedChip) {
      this.setState((prevState) => ({
        chips: prevState.chips.filter((c) => c !== deletedChip),
      }));
    }
  }

  selectedMenuSummaryAdded(msg, summary) {
    const { chips } = this.state;
    if (msg === Commons.CHECKED_MENU_OPTIONS) {
      this.setState({
        selectedMenuSummary: summary,
        menuSelected: true,
      });
      chips.push(summary);
    }
    if (msg === Commons.TYPED_SEARCH_OPTIONS) {
      this.setState({
        typedSearchOptions: summary,
        searchOptions: true,
      });
      chips.push(summary);
    }
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      ...this.state,
      chips,
    });
  }

  componentWillMount() {
    this.menutoken = this.pubsubObj
      .subscribe(Commons.CHECKED_MENU_OPTIONS, this.selectedMenuSummaryAdded.bind(this));
    this.searchtoken = this.pubsubObj
      .subscribe(Commons.TYPED_SEARCH_OPTIONS, this.selectedMenuSummaryAdded.bind(this));
  }

  render() {
    const { menuSelected, searchOptions, chips } = this.state;
    if (menuSelected || searchOptions) {
      return (
        <div style={{ backgroundColor: grey[300] }}>
          <MuiThemeProvider theme={theme}>
            <ChipInput
              {...this.props}
              value={chips}
              onDelete={(deletedChip) => this.handleDelete(deletedChip)}
              onBlur={(event) => {
                // eslint-disable-next-line react/destructuring-assignment
                if (this.props.addOnBlur && event.target.value) {
                  this.handleAdd(event.target.value);
                }
              }}
              style={{
                borderWidth: 0, '&:focus': { outline: 'none', borderWidth: 0 }, backgroundColor: grey[200], borderColor: grey[100], color: grey[500], textDecorationColor: grey[500],
              }}
              fullWidth
              label="Selection summary"
              variant="outlined"
              readonly="true"
              allowDuplicates={false}
              onKeyDown={(e) => {
                e.preventDefault();
                return false;
              }}
              onPaste={(e) => {
                e.preventDefault();
              }}
              onFocus={(e) => {
                e.stopPropagation();
              }}
            />
          </MuiThemeProvider>
        </div>
      );
    }
    return (
      <div />
    );
  }
}