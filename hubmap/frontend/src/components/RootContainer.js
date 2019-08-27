
import React from 'react';
import Container from '@material-ui/core/Container';
import { Route, BrowserRouter } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';
import DataAnalysisComponent from '../pages/DataAnalysis';
import UserFAQsComponent from '../pages/UserFAQs';
import ExperimentsComponent from '../pages/Experiments';
import PipelinesComponent from '../pages/Pipelines';
import HomePage from '../pages/HomePage';

function RootContainer() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container xl="true" component="div" className="gridContainer" style={{ height: '100vh', flexGrow: 1 }}>
        <Route exact path="/dataanalysis" component={DataAnalysisComponent} />
        <Route exact path="/userfaqs" component={UserFAQsComponent} />
        <Route exact path="/experiments" component={ExperimentsComponent} />
        <Route exact path="/pipelines" component={PipelinesComponent} />
        <Route exact path="/" component={HomePage} />
        <Footer />
      </Container>
    </BrowserRouter>
  );
}
export default RootContainer;
