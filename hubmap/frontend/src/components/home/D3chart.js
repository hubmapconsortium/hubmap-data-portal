// TODO!
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable func-names */
/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */

import React from 'react';
import * as d3 from 'd3';
import { CircularProgress, Typography } from '@material-ui/core';
import { get_experiments, in_progress } from '../../middleware/actions';
import * as Constants from '../../commons/constants';
import { store } from '../../index';

class ImageCountStackedChart extends React.Component {
  currentState = {};

  previousState = {};

  sample1 = [
    {
      image_count: [
        ['Tissue', ['Caltech', 'Florida', 'Stanford', 'UCSD', 'Vanderbilt']],
        ['Abdomen', [6, 13, 22, 33, 0]],
        ['Bladder', [0, 12, 0, 0, 0]],
        ['Colon', [0, 12, 0, 30, 0]],
        ['Heart', [0, 21, 19, 0, 0]],
        ['Kidney', [0, 0, 15, 0, 12]],
        ['LargeIntestine', [0, 27, 0, 0, 0]],
        ['Liver', [8, 0, 19, 11, 0]],
        ['Lungs', [0, 22, 0, 17, 0]],
        ['Pancreas', [0, 0, 6, 0, 0]],
        ['SmallIntestine', [0, 0, 0, 0, 0]],
        ['Spleen', [0, 0, 0, 0, 0]],
      ],
    },
  ]

  data1 = this.sample1[0].image_count.reduce((arr, h) => {
    if (h !== undefined) {
      arr.push([h[0]].concat(h[1]));
    }
    return arr;
  }, [])

  data = this.data1.slice(1).map((da) => ({
    tissue: da[0],
    Caltech: da[1],
    Florida: da[2],
    Stanford: da[3],
    UCSD: da[4],
    Vanderbilt: da[5],
  }))

  componentDidMount() {
    store.subscribe(() => this.currentState = store.getState().experimentState);
    if (this.currentState !== '' && this.currentState.status !== Constants.IN_PROGRESS
      && this.currentState.response !== {}
      && this.currentState.type === Constants.GET_EXPERIMENTS) {
      this.props.dispatch(get_experiments(this.currentState));
    } else if (this.currentState.type === Constants.GET_EXPERIMENTS && this.currentState.status === Constants.IN_PROGRESS) {
      this.props.dispatch(in_progress());
    }
    this.drawChart();
  }

  drawChart() {
    const margin = {
      top: 30, right: 10, bottom: 0, left: 75,
    };
    const height = this.data.length * 25 + margin.top + margin.bottom;
    const width = 960;
    const y = d3
      .scaleBand()
      .domain(this.data.map((d) => d.tissue))
      .range([margin.top, height - margin.bottom])
      .padding(0.1);
    const yAxis = (g) => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickSizeOuter(0))
      .call((g) => g.selectAll('.domain').remove());
    const xAxis = (g) => g
      .attr('transform', `translate(0,${margin.top})`)
      .call(d3.axisTop(x).ticks(width / 100, 's'))
      .call((g) => g.selectAll('.domain').remove());
    const series = d3
      .stack()
      .keys(['Tissue', 'Caltech', 'Florida', 'Stanford', 'UCSD', 'Vanderbilt'])(
        this.data.slice(1),
      );
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1]))])
      .range([margin.left, width - margin.right]);
    const color = d3
      .scaleOrdinal()
      .domain(series.map((d) => d.key))
      .range(
        d3
          .quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), series.length)
          .reverse(),
      )
      .unknown('#ccc');

    const svg = d3.select(this.svg);
    svg
      .append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    // d3.create("svg").attr("viewBox", [0, 0, width, height]);

    const tooltip = svg.append('g')
      .attr('class', 'tooltip')
      .style('display', 'none');

    tooltip.append('rect')
      .attr('width', 60)
      .attr('height', 20)
      .attr('fill', 'black')
      .style('opacity', 0.5);

    tooltip.append('text')
      .attr('x', 5)
      .attr('dy', '1.2em')
      .style('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold');
    svg
      .append('g')
      .selectAll('g')
      .data(series)
      .join('g')
      .attr('fill', (d) => color(d.key))
      .selectAll('rect')
      .data((d) => d)
      .join('rect')
      .attr('x', (d) => x(d[0]))
      .attr('y', (d, i) => y(d.data.tissue))
      .attr('width', (d) => x(d[1]) - x(d[0]))
      .attr('height', y.bandwidth())
      .on('mouseenter', function (actual, i) {
        d3.selectAll('.tissue').attr('opacity', 0);
        d3.select(this)
          .transition()
          .duration(100)
          .attr('opacity', 0.6);
      })
      .on('mouseover', (actual, i) => {
        tooltip.style('display', null);
      })
      .on('mouseout', (actual, i) => {
        tooltip.style('display', 'none');
      })
      .on('onmousemove', (d) => {
        const CTM = svg.getScreenCTM();
        const mousex = (d.clientX - CTM.e + 6) / CTM.a;
        const mousey = (d.clientY - CTM.f + 20) / CTM.d;
        tooltip.attr('transform', `translate(" + ${mousex} + "," + ${mousey} + ")`);
        tooltip.select('text').text(d[1] - d[0]);
      })
      .on('mouseleave', function () {
        d3.selectAll('.May2019').attr('opacity', 1);

        d3.select(this)
          .transition()
          .duration(200)
          .attr('opacity', 1);
      });

    svg.append('g').call(xAxis);

    svg.append('g').call(yAxis);

    // return svg.node();
  }

  render() {
    const {
      response, error, status, type,
    } = store.getState().experimentState;

    if (error) {
      return (
        <div>
Error!
          {error.message}
        </div>
      );
    }

    if (response !== '' && response !== undefined && type === Constants.GET_EXPERIMENTS
      && status === Constants.SUCCESS) {
      return (
        <div id="chartcontainer">
          <svg id="barchart" ref={(svg) => (this.svg = svg)} />
        </div>
      );
    }
    if (status === Constants.IN_PROGRESS && response === undefined && type === Constants.GET_EXPERIMENTS) {
      return (
        <ImageCountStackedChart
          size="medium"
          style={{ maxWidth: '100%' }}
          title={(
            <Typography variant="title">
Experiments From HuBMAP Consortium
              {(status === Constants.IN_PROGRESS) && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
            </Typography>
)}
        />
      );
    }

    this.drawChart();
    return (
      <div id="chartcontainer">
        <svg id="barchart" ref={(svg) => (this.svg = svg)} />
      </div>
    );
  }
}
export default ImageCountStackedChart;
