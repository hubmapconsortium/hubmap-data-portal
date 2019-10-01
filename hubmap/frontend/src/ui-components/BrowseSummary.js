import React from 'react';

import PubSub from 'pubsub-js';
import { Chip, Typography } from '@material-ui/core';
import * as Commons from '../commons';

export default class SelectedBrowseOptionsSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuSelected: false,
      searchOptions: false,
      chips: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.summary = '';
    this.searchToken = '';
    this.menuToken = '';
  }

  handleDelete(deletedChip) {
    this.setState((prevState) => ({
      chips: prevState.chips.filter((c) => c !== deletedChip),
    }));
  }

  addSelectedOptions(msg, summary) {
    this.setState((prevState) => ({
      chips: prevState.chips.concat(summary),
      menuSelected: msg === Commons.CHECKED_MENU_OPTIONS,
      searchOptions: msg === Commons.TYPED_SEARCH_OPTIONS,
    }));
  }

  componentWillMount() {
    this.menuToken = PubSub
      .subscribe(Commons.CHECKED_MENU_OPTIONS, this.addSelectedOptions.bind(this));
    this.searchToken = PubSub
      .subscribe(Commons.TYPED_SEARCH_OPTIONS, this.addSelectedOptions.bind(this));
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.menuToken);
    PubSub.unsubscribe(this.searchToken);
  }


  render() {
    const { menuSelected, searchOptions, chips } = this.state;
    if ((menuSelected || searchOptions) && chips.length > 0) {
      const chipsArray = [];
      chips.forEach((chip) => (
        chipsArray.push(
          <Chip
            value={chip}
            onDelete={this.handleDelete(chip)}
            onBlur={(event) => {
              if (event.target.value) {
                this.handleAdd(event.target.value);
              }
            }}

            fullWidth
            label={chip}
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
          />,
        )));
      return (
        <Typography>Browse summary:
          {chipsArray}
        </Typography>
      );
    }
    return (
      <div />
    );
  }
}
