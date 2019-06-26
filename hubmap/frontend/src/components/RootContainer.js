import React from 'react';
import Container from '@material-ui/core/Container';
import HumanSvg from "./HumanSvg";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import Footer from "./Footer";
import NavBar from "./NavBar";
import CellCountByTissueChart from "./CellCountByTissueChart"
import ImageCountByTissuesChart from './ImageCountByTissueChart';
import MaterialTableDemo from './MUITable';
import StudiesBarChart from './BarChart';
import ImageCountStackedChart from './d3chart';
import viridis from '../images/viridis.png'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  humanClass:
  {
    marginTop: "-30px",
  },
  humanPaper: {
    flex: 1,
    width: "320px",
    height: "650px",
    border: '0px solid #fafafa',
    backgroundColor: grey[50],
    color: grey[800],
    marginTop: theme.spacing(1),
    padding: theme.spacing(1, 1, 1, 1),
  },
  chartPaper: {
    flex: 1,
    width: "420px",
    height: "650px",
    border: '0px solid #fafafa',
    backgroundColor: grey[50],
    color: grey[800],
    marginTop: theme.spacing(1),
    padding: theme.spacing(1, 1, 1, 1),
  },

}));

function RootContainer() {
  const classes = useStyles();
  return (
    <Container xl="true" component="div" style={{ height: '1600px' }} >
      <Grid container className={classes.root} spacing={8} margin-top="20px">
        <Grid item style={{height:30}}>
          <NavBar />
        </Grid>
        <Grid item style ={{height: '300px', width: '5px', marginTop: '110px', marginLeft:'-50px' }}>
        <img src={viridis} style={{  transform:'scale(0.6)', }} alt="Color Map"/>
        </Grid>
        <Grid item style={{ height: '700px', width: '320px', marginTop: '110px', marginLeft:'-30px' }} >
          <HumanSvg studies={''} />
        </Grid>
        <Grid item style={{ height: '400px', width: '420px', marginTop: '170px', marginLeft:'10px'}}>
          <CellCountByTissueChart />
        </Grid>
        <Grid item style={{ height: '400px', width: '450px', marginTop: '170px', marginLeft:'10px'}}>
          <ImageCountByTissuesChart />
        </Grid>
        <Grid item style={{ height: '450px', width: '900px', marginTop: '-250px', marginLeft:'370px'}}>
          <MaterialTableDemo />
        </Grid>
        <Grid item style={{ height: '700px', width: '1200px', marginTop: '250px', marginLeft:'0px'}}>
          <StudiesBarChart />
        </Grid>
        <Grid item style={{ height: '700px', width: '1200px', marginTop: '250px', marginLeft:'0px'}}>
          <ImageCountStackedChart />
        </Grid>
        <Footer />
      </Grid>
    </Container>
  );
}
export default RootContainer;