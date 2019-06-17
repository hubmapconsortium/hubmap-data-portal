import React, { PureComponent } from 'react';
import Container from '@material-ui/core/Container';
import HumanSvg from "./HumanSvg";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import Footer from "./Footer";
import NavBar from "./NavBar";
import StudiesChart from "./StudiesBarChart"
import StudiesDashboard from './StudiesDashboard';
import MaterialTableDemo from './MUITable';

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
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  function handleChange(event, value) {
    setSpacing(Number(value));
  }
  return (
    <Container xl="true" component="div" style={{ height: '1600px' }} >
      <Grid container className={classes.root} spacing={8} margin-top="20px">
        <Grid item >
          <NavBar />
        </Grid>
        <Grid item style={{ height: '700px', width: '320px', marginTop: '90px', marginLeft:'-50px' }} >
          <HumanSvg studies={''} />
        </Grid>
        <Grid item style={{ height: '400px', width: '420px', marginTop: '170px', marginLeft:'20px'}}>
          <StudiesChart />
        </Grid>
        <Grid item style={{ height: '400px', width: '450px', marginTop: '170px', marginLeft:'20px'}}>

          <StudiesDashboard />
        </Grid>
        <Grid item style={{ height: '600px', width: 'auto', marginTop: '-190px', marginLeft:'360px'}}>
          <MaterialTableDemo />
        </Grid>
        <Footer />
      </Grid>
    </Container>
  );
}
export default RootContainer;