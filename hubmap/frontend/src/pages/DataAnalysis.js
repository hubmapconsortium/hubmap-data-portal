// TODO!
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import CellCountByTissueChart from '../components/home/CellCountByTissueChart';
import ImageCountByTissuesChart from '../components/home/ImageCountByTissueChart';

class DataAnalysisComponent extends React.Component {
  render() {
    return (
      <div style={{ margin: 100 }}>
        <CellCountByTissueChart />
        <ImageCountByTissuesChart />
      </div>
    );
  }
}
export default DataAnalysisComponent;
