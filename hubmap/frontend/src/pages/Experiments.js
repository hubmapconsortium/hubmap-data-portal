// TODO!
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import TestUIComponents from '../components/TestUIComponents';

class ExperimentsComponent extends React.Component {
  render() {
    return (
      <div style={{ margin: 100 }}>
        Experiments
        <TestUIComponents />
      </div>
    );
  }
}
export default ExperimentsComponent;
