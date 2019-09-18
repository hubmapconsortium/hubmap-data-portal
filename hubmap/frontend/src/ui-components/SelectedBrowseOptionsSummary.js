import React from 'react';
import ChipInput from 'material-ui-chip-input';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

import * as Commons from '../commons';
import { PubSubApi } from '../middleware';

const theme = createMuiTheme({});
theme.overrides = {
  MuiOutlinedInput: {
    root: {
      '&$focused $notchedOutline': {
        borderColor: blue[500],
        borderWidth: 1,
        fontColor: 'black',
        fontSize: '16px',
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
    this.pubsubObj = new PubSubApi();
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
      this.setState({
        chips: this.state.chips.filter((c) => c !== deletedChip),
      });
    } else {
      // alert('Why would you delete React?');
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
      ...this.state,
      chips: chips,
    });
  }

  componentWillMount() {
    this.menutoken = this.pubsubObj.subscribe(Commons.CHECKED_MENU_OPTIONS, this.selectedMenuSummaryAdded.bind(this));
    this.searchtoken = this.pubsubObj.subscribe(Commons.TYPED_SEARCH_OPTIONS, this.selectedMenuSummaryAdded.bind(this));
  }

  render() {
    const { menuSelected, searchOptions, chips } = this.state;
    if (menuSelected || searchOptions) {
      return (
        <MuiThemeProvider theme={theme} >
        <ChipInput
          {...this.props}
          value={chips}
          onAdd={(chip) => this.handleAdd(chip)}
          onDelete={(deletedChip) => this.handleDelete(deletedChip)}
          onBlur={(event) => {
            if (this.props.addOnBlur && event.target.value) {
              this.handleAdd(event.target.value);
            }
          }}
          style={{ borderWidth: 0 }}
          fullWidth
          label="Selection summary"
          variant="outlined"
          />
          </MuiThemeProvider>
      );
    }
    return (
      <div />
    );
  }
}
