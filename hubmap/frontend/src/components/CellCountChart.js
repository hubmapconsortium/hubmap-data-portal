import React from "react";
import * as d3 from "d3";
import "./App.css";
const sample1 = [
  {
    center: "Florida",
    May2019: 78.9,
    color: "#000000"
  },
  {
    center: "Vanderbilt",
    May2019: 75.1,
    color: "#00a2ee"
  },
  {
    center: "Stanford",
    May2019: 68.0,
    color: "#fbcb39"
  },
  {
    center: "Caltech",
    May2019: 67.0,
    color: "#007bc8"
  },
  {
    center: "UCSD",
    May2019: 65.6,
    color: "#65cedb"
  }
];

const sample = [
  { center: "Florida", May2019: 5, June2019: 8 },
  { center: "Vanderbilt", May2019: 8, June2019: 22 },
  { center: "Stanford", May2019: 8, June2019: 18 },
  { center: "Caltech", May2019: 5, June2019: 18 },
  { center: "UCSD", May2019: 5, June2019: 18 }
];

class StudyBarChart extends React.Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const margin = 60;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;
    const svg = d3.select(this.svg);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);
    const yScale = d3
      .scaleBand()
      .range([height, 0])
      .domain(sample.map(s => s.center))
      .padding(0.4);

    const xScale = d3
      .scaleLinear()
      .range([0, width])
      .domain([0, 10]);

    const makeXLines = () => d3.axisBottom().scale(xScale);

    chart
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    chart
      .append("g")
      .attr("class", "grid")
      .call(
        makeXLines()
          .tickSize(height, 0, 0)
          .tickFormat("")
      );

    chart
      .append("g")
      //.attr("transform", `translate(${height}), 0`)
      .call(d3.axisLeft(yScale));
    const barGroups = chart
      .selectAll()
      .data(sample)
      .enter()
      .append("g");

    barGroups
      .append("rect")
      .attr("class", "bar")
      .attr("y", s => yScale(s.center))
      .attr("x", s => xScale(s.May2019))
      .attr("height", yScale.bandwidth())
      .attr("width", s => width - xScale(s.May2019));
  }
  render() {
    return (
      <div id="chartcontainer">
        <svg id="barchart" ref={svg => (this.svg = svg)} />
      </div>
    );
  }
}

export default StudyBarChart;
