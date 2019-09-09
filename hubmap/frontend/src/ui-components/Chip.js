import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

export default function CustomChip(props) {
  const classes = useStyles();

  function handleDelete() {
    alert('You clicked the delete icon.');
  }

  function handleClick() {
    alert('You clicked the Chip.');
  }
  const [selectedValue] = props;
  return (
    <div className={classes.root}>
      <Chip
        label={selectedValue}
        onClick={handleClick}
        onDelete={handleDelete}
        className={classes.chip}
      />
    </div>
  );
}
