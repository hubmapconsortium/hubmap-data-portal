import React from 'react';
import Container from '@material-ui/core/Container';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';
import DataAnalysisPage from '../pages/DataAnalysis';
import UserFAQsPage from '../pages/UserFAQs';
import ExperimentsPage from '../pages/Experiments';
import PipelinesPage from '../pages/Pipelines';
import DetailsPage from '../pages/DetailsPage';
import HomePage from '../pages/HomePage';
import NoMatchPage from '../pages/NoMatch';

function RootContainer() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container xl="true" component="div" className="gridContainer" style={{ height: '100vh', flexGrow: 1 }}>
        <Switch>
          <Route exact path="/dataanalysis" component={DataAnalysisPage} />
          <Route exact path="/userfaqs" component={UserFAQsPage} />
          <Route exact path="/experiments" component={ExperimentsPage} />
          <Route exact path="/pipelines" component={PipelinesPage} />
          <Route exact path="/details" component={DetailsPage} />
          <Route exact path="/" component={HomePage} />
          <Route component={NoMatchPage} />
        </Switch>
        <Footer />
      </Container>
    </BrowserRouter>
  );
}
export default RootContainer;
