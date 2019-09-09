import React, { PureComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { CustomSearchInput } from '../../ui-components/';

const useStyles = makeStyles((theme) => ({
    chip: {
      margin: theme.spacing(1),
    },
    textField: {
      backgroundColor: '#ffffff',
    },
  }));

export default function SearchDropdown() {
  return (<CustomSearchInput
    id="filled-search"
    label="Search"
    type="search"
    className={useStyles.textField}
    margin="normal"
    variant="outlined"
  />);
}
