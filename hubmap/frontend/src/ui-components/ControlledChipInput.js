import React from 'react';
import PropTypes from 'prop-types';
import ChipInput from 'material-ui-chip-input';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import { PubSubApi } from '../middleware';
import * as Commons from '../commons';

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

const selectedValue = [];

class ControlledChipInput extends React.Component {
  pubsubObj = null;

  constructor(props) {
    super(props);
    this.state = {
      chips: [],
    };
    this.pubsubObj = new PubSubApi();
  }

  onBeforeAdd(chip) {
    return chip.length >= 3;
  }

  handleAdd(chip) {
    this.setState({
      chips: [...this.state.chips, chip],
    });
    selectedValue.push(chip);
    this.pubsubObj.publish(Commons.TYPED_SEARCH_OPTIONS, chip);
  }

  handleDelete(deletedChip) {
    if (deletedChip) {
      this.setState({
        chips: this.state.chips.filter((c) => c !== deletedChip),
      });
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <ChipInput
          {...this.props}
          value={this.state.chips}
          onBeforeAdd={(chip) => this.onBeforeAdd(chip)}
          onAdd={(chip) => this.handleAdd(chip)}
          onDelete={(deletedChip) => this.handleDelete(deletedChip)}
          onBlur={(event) => {
            if (this.props.addOnBlur && event.target.value) {
              this.handleAdd(event.target.value);
            }
          }}
          fullWidth
          label="Search"
          variant="outlined"
    />
      </MuiThemeProvider>
    );
  }
}

ControlledChipInput.propTypes = {
  addOnBlur: PropTypes.bool,
  chip: PropTypes.string,
};
ControlledChipInput.defaultProps = {
  addOnBlur: false,
  chip: '',
};
export default ControlledChipInput;
