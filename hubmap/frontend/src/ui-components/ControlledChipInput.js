import React from 'react';
import PropTypes from 'prop-types';
import ChipInput from 'material-ui-chip-input';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

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
        fontSize: "16px",
      },
    },
  },
};

class ControlledChipInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chips: ['Homo Sapiens'],
    };
  }

  onBeforeAdd(chip) {
    return chip.length >= 3;
  }

  handleAdd(chip) {
    this.setState({
      chips: [...this.state.chips, chip],
    });
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
        variant='outlined'
    />
    </MuiThemeProvider>
    );
  }
}

ControlledChipInput.propTypes = {
  addOnBlur: PropTypes.bool,
};
ControlledChipInput.defaultProps = {
  addOnBlur: false,
};
export default ControlledChipInput;
