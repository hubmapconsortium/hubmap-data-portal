// TODO:
/* eslint-disable react/prop-types */

import './App.scss';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import RootContainer from './components/RootContainer';
import { getTissueColorsFromServer, getAllExperiments, getGeneTissueColors } from './middleware/actions';


class App extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllExperiments());
    dispatch(getTissueColorsFromServer());
    dispatch(getGeneTissueColors());
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
