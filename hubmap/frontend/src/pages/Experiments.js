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
} from '../components/browse';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: grey[300],
    marginTop: '150px',
  },

}));
export default class Experiments extends React.Component {
  componentDidMount() {

  }

  render() {
    const menuitems = ['Species', 'Homo Sapiens', 'Mus musculus'];
    return (
      <div className={useStyles.root}>
        <Grid container spacing={3} style={{marginTop: '150px'}} justify="left" alignItems="left">
          <Grid item xs={12}>            
            <Title>Explore Experiments data</Title>
          </Grid>
          <Grid item xs={3} >
            <SearchDropdown />
          </Grid>
          <Grid item xs={3} >
            <DonorDropdown />
          </Grid>
          <Grid item xs={3}>
            <DonorDropdown />
          </Grid>
          <Grid item xs={3}>
            <DonorDropdown />
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={12} />
          <Grid item xs={12}>            

            <ExperimentsTable />
          </Grid>
        </Grid>
      </div>
    );
  }
}
