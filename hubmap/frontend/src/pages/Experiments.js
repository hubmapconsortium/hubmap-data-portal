import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import blue from '@material-ui/core/colors/blue';
import Title from '../components/browse/Title';
import {
  ExperimentsTable,
  SearchDropdown,
  SpecimenDropdown,
  DonorDropdown,
  TissueTypeDropdown,
  MethodDropdown,
  FileDropdown,
  AssaysDropdown,
} from '../components/browse';

import { SelectedBrowseOptionsSummary } from '../ui-components';
import { Divider, Typography } from '@material-ui/core';
import { borderColor } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '150px',
    width: '2100px',
    marginLeft: '-200px'
  },

}));
export default class Experiments extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className={useStyles.root}>
        <Grid container spacing={3} style={{ marginTop: '150px', width: '2100px' }} justify="left" alignItems="left">
          <Grid item xs={12} >            
            <Title>Browse Experiments data</Title>
          </Grid>
          <Grid item xs={3} >
            <SearchDropdown />
          </Grid>
          <Grid item xs={1} >
            <DonorDropdown />
          </Grid>
          <Grid item xs={1}>
            <TissueTypeDropdown />
          </Grid>
          <Grid item xs={1}>
            <MethodDropdown />
          </Grid>
          <Grid item xs={1}>
            <FileDropdown />
          </Grid>
          <Grid item xs={1}>
            <SpecimenDropdown />
          </Grid>
          <Grid item xs={1}>
            <AssaysDropdown />
          </Grid>
          <Grid item xs={12}>                      
            <SelectedBrowseOptionsSummary />
          </Grid>
          <Grid item xs={12}>   
            <Typography align="left" variant="body1" style={{fontWeight:'normal',textUnderlinePosition:'under', textDecorationStyle:'initial', textDecoration:'underline',textDecorationColor: blue[500], color:'black', borderBottomColor:blue[500]}}> Experiments </Typography>                   
            <Divider />
          </Grid>
          <Grid item xs={12}>            
            <ExperimentsTable />
          </Grid>
        </Grid>
      </div>
    );
  }
}
