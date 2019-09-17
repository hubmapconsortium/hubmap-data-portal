import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import Title from '../components/browse/Title';
import {
  ExperimentsTable,
  SearchDropdown,
  SpecimenDropdown,
  DonorDropdown,
  TissueTypeDropdown,
  MethodDropdown,
  FileDropdown,
} from '../components/browse';

import { SelectedBrowseOptionsSummary } from '../ui-components';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '150px',
    width:'1900px',
  },

}));
export default class Experiments extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className={useStyles.root}>
        <Grid container spacing={3} style={{marginTop: '150px', width:'100%'}} justify="left" alignItems="left">
          <Grid item xs={12}>            
            <Title>Browse Experiments data</Title>
          </Grid>
          <Grid item xs={2} >
            <SearchDropdown />
          </Grid>
          <Grid item xs={2} >
            <DonorDropdown />
          </Grid>
          <Grid item xs={2}>
            <TissueTypeDropdown />
          </Grid>
          <Grid item xs={2}>
            <MethodDropdown />
          </Grid>
          <Grid item xs={2}>
            <FileDropdown />
          </Grid>
          <Grid item xs={2}>
            <SpecimenDropdown />
          </Grid>
          <Grid item xs={12}>                      
            <SelectedBrowseOptionsSummary />
          </Grid>
          <Grid item xs={12}>            

            <ExperimentsTable />
          </Grid>
        </Grid>
      </div>
    );
  }
}
