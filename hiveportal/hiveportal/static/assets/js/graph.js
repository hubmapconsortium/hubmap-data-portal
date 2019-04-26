import React from 'react';
import Axis from './axis';
import GraphBody from './graph_body';

export default class Graph extends React.Component {
  render() {
    return (
      <svg>
        <Axis
          length={width}
          horizontal={true}
        />
        <Axis
          length={height}
          horizontal={false}
        />
        <GraphBody
          data={this.props.data}
        />
      </svg>
    )
  }
}