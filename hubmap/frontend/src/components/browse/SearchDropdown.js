import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ControlledChipInput } from '../../ui-components';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(1),
  },
  textField: {
    backgroundColor: '#ffffff',
  },
}));

export default class SearchDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchtext: '',
    };
  }

  render() {
    return (
      <div>  
        <ControlledChipInput />        
      </div>
    );
  }
}
