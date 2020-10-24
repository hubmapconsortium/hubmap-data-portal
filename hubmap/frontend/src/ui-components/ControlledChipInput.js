import React from 'react';
import PropTypes from 'prop-types';
import ChipInput from 'material-ui-chip-input';
import { MuiThemeProvider } from '@material-ui/core/styles';
import PubSub from 'pubsub-js';
import { controlledChipInputTheme } from './styles';
import * as Commons from '../commons';

const selectedValue = [];

class ControlledChipInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chips: [],
    };
  }

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
      <MuiThemeProvider theme={controlledChipInputTheme}>
        <ChipInput
          {...this.props}
          value={chips}
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
