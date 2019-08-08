import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Footer from "./Footer";
import NavBar from "./NavBar";
import {Route, BrowserRouter } from 'react-router-dom';
import DataAnalysisComponent from '../pages/DataAnalysis';
import UserFAQsComponent from '../pages/UserFAQs';
import ExperimentsComponent from '../pages/Experiments';
import PipelinesComponent from '../pages/Pipelines';
import HomeComponent from '../pages/HomeComponent';
import GlobusSignIn from '../pages/GlobusSignin';

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
    backgroundColor: grey[300],
    color: grey[800],
    marginTop: theme.spacing(1),
    padding: theme.spacing(1, 1, 1, 1),
  },
  chartPaper: {
    flex: 1,
    width: "420px",
    height: "650px",
    border: '0px solid #fafafa',
    backgroundColor: grey[300],
    color: grey[800],
    marginTop: theme.spacing(1),
    padding: theme.spacing(1, 1, 1, 1),
  },

}));

function RootContainer() {
  const classes = useStyles();
  return (
    <BrowserRouter >
     <NavBar />
    <Container xl="true" component="div" style={{ height: '1600px' }} >
    <Route exact path="/dataanalysis" component={DataAnalysisComponent}/>
    <Route exact path="/userfaqs" component={UserFAQsComponent}/>
    <Route exact path="/experiments" component={ExperimentsComponent}/>
    <Route exact path="/pipelines" component={PipelinesComponent}/>
    <Route exact to="login/" component={GlobusSignIn} />
    <Route exact path="/" component={HomeComponent} />
    <Route exact path="/loggedin/" component={HomeComponent} />
    <Footer />
    </Container>
    </BrowserRouter >
  );
}
export default RootContainer;