// TODO!
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */

import './App.scss';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import RootContainer from './components/RootContainer';
import { getTissueColorsFromServer, getAllExperiments, getGeneTissueColors } from './middleware/actions';

// import '@google/model-viewer' ;
// npm run setup -- --spaceId eo4e2dc0pbyt --deliveryToken H3bSZhVoA8_0_hjDzD6yGsq1jHCdBgxop3iJ9EM54B8 --managementToken CFPAT-nXzmTIQFv4Om1KFSnqn0fS3X7_3YLXDacst4IC52_1M
/* TODO: add chart
*   DONE: Add api get results fron django to populate results for each tissue
*      DONE: Added organs prototype + clickable+rest api!! phew!! */


class App extends PureComponent {
  componentDidMount() {
    this.props.dispatch(getAllExperiments());
    this.props.dispatch(getTissueColorsFromServer());
    this.props.dispatch(getGeneTissueColors());
  }

  render() {
    return (
      <div className="App">

        <RootContainer />
      </div>

    );
  }
}
export default connect()(App);
