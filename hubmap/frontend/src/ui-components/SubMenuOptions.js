import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { grey } from '@material-ui/core/colors';
import PubSub from 'pubsub-js';
import { GreyCheckbox, useStyles } from './styles';
import * as Commons from '../commons';

export default class BaseChildDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMenuSummary: props.selectedMenuSummary,
    };
  }

  handleChange = (checkedMenuValue) => (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      PubSub.publish(Commons.CHECKED_MENU_OPTIONS, checkedMenuValue);
    } else {
      PubSub.publish(Commons.UNCHECKED_MENU_OPTIONS, checkedMenuValue);
    }
  };

  componentWillMount() {
    this.setState((state) => ({
      ...state,
    }));
  }

  render() {
    const { menuItems, menuName, selectedMenuSummary } = this.props;
    return (
      <FormControl component="fieldset" className={useStyles.formControl} style={{ padding: '10px' }}>
        <FormLabel
          component="label"
          color={grey[800]}
          style={{
            fontSize: '16px', padding: '10px', fontWeight: 'bold', margin: '10px',
          }}
        >{menuName}
        </FormLabel>
        <FormGroup>
          {menuItems.map((menuItem) => {
            let isChecked = false;
            const changedValue = `${menuName}_${menuItem}`;
            const index = (selectedMenuSummary || [])
              .findIndex((listItem) => listItem.name === changedValue);
            isChecked = index > -1 ? selectedMenuSummary[index].checked : false;

            return (
              <FormControlLabel
                key={menuItem}
                control={(
                  <GreyCheckbox
                    onChange={this.handleChange(`${menuName}_${menuItem}`)}
                    value={menuItem}
                    key={menuItem}
                    checked={isChecked}
                  />
                    )}
                label={menuItem}
              />
            );
          })}

        </FormGroup>
      </FormControl>
    );
  }
}

BaseChildDropdown.propTypes = {
  menuItems: PropTypes.shape(),
  menuName: PropTypes.string,
  selectedMenuSummary: PropTypes.string,
};
BaseChildDropdown.defaultProps = {
  menuItems: {},
  menuName: '',
  selectedMenuSummary: '',
};
