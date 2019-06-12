import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import HumanSvg from "./HumanSvg";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';
import SearchBox from './Search';
import Header from "./Header"
import Footer from "./Footer";
import NavBar from "./NavBar";
import StudiesChart from "./StudiesBarChart"
import StudiesDashboard from './StudiesDashboard';
import StudiesTable from './StudiesTable';

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
    <Container xl="true" component="div" style={{ height: '1200px' }} >
      <Grid container className={classes.root} spacing={5} margin-top="20px">
        <Grid item md >
          <NavBar />
        </Grid>
        <Grid item style={{ height: '650px', width: '320px', marginTop: '-40px', marginRight: '10px' }} >
          <HumanSvg studies={''} />
        </Grid>
        <Grid item style={{ height: '400px', width: '450px', marginTop: '50px' }}>
          <StudiesChart />
        </Grid>
        <Grid item style={{ height: '400px', width: '450px', marginTop: '50px' }}>

          <StudiesDashboard />
        </Grid>
        <Grid item>
          <StudiesTable />
        </Grid>
        <Footer />
      </Grid>
    </Container>
  );
}
export default RootContainer;