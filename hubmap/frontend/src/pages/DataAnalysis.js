import React from 'react';
import CellCountByTissueChart from '../components/home/CellCountByTissueChart';
import ImageCountByTissuesChart from '../components/home/ImageCountByTissueChart';

export default function DataAnalysisComponent() {
  return (
    <div style={{ margin: 100 }}>
      <CellCountByTissueChart />
      <ImageCountByTissuesChart />
    </div>
  );
}
