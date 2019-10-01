import React from 'react';
import PropTypes from 'prop-types';
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

  constructor(props) {
    super(props);
    this.state = {
      chips: [],
    };
  }

  onBeforeAdd = (chip) => chip.length >= 3

  handleAdd(chip) {
    this.setState((prevState) => ({
      chips: [prevState.chips, chip],
    }));
    selectedValue.push(chip);
    PubSub.publish(Commons.TYPED_SEARCH_OPTIONS, chip);
  }

  handleDelete(deletedChip) {
    if (deletedChip) {
      this.setState((prevState) => ({
        chips: prevState.chips.filter((c) => c !== deletedChip),
      }));
    }
  }

  render() {
    const { chips } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <ChipInput
          {...this.props}
          value={chips}
          onBeforeAdd={(chip) => this.onBeforeAdd(chip)}
          onAdd={(chip) => this.handleAdd(chip)}
          onDelete={(deletedChip) => this.handleDelete(deletedChip)}
          onBlur={(event) => {
            // eslint-disable-next-line react/destructuring-assignment
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
