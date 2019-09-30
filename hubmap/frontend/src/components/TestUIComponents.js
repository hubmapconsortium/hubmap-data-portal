import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  BrowseSummary, ControlledChipInput, BaseSelectDropdown,
} from '../ui-components';
import facets from '../data/searchFacets.json';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: '150px',
    width: '2100px',
    marginLeft: '-200px',
  },
}));
const menuCategories = facets.facets.Assays;

export default function MockupUIComponents() {
  return (
    <div className={useStyles.root}>
      <Grid container spacing={3} style={{ marginTop: '150px', width: '2100px' }} justify="left" alignItems="left">
        <Grid item xs={12}>
            Browse Experiments data
        </Grid>
        <Grid item xs={3}>
          <ControlledChipInput />
        </Grid>
        <Grid item xs={3}>
          <BaseSelectDropdown
            margin="normal"
            variant="outlined"
            menusections={menuCategories}
            menuname="Assays"
            width="200px"
          />
        </Grid>
        <Grid item xs={12}>
          <BrowseSummary />
        </Grid>
      </Grid>
    </div>
  );
}
