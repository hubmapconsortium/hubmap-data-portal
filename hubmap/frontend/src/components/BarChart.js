import React from 'react';
import * as d3 from 'd3';
import '../App.css'
const sample1 = [
    {
      center: 'Florida',
      May2019: 78.9,
      color: '#000000'
    },
    {
      center: 'Vanderbilt',
      May2019: 75.1,
      color: '#00a2ee'
    },
    {
      center: 'Stanford',
      May2019: 68.0,
      color: '#fbcb39'
    },
    {
      center: 'Caltech',
      May2019: 67.0,
      color: '#007bc8'
    },
    {
      center: 'UCSD',
      May2019: 65.6,
      color: '#65cedb'
    },

  ];

  const sample = [
    {center: 'Florida', May2019: 5, June2019: 8},
    {center:'Vanderbilt',  May2019:8, June2019: 22},
    {center:'Stanford',  May2019:8, June2019: 18},
    {center:'Caltech',  May2019:5, June2019: 18},
    {center:'UCSD',  May2019:5, June2019: 18},
];

class StudiesBarChart extends React.Component{

    componentDidMount() {
        this.drawChart();
    }

    drawChart() {

        const margin = 60;
        const width = 1000 - 2 * margin;
        const height = 600 - 2 * margin;
        const svg = d3.select(this.svg);
        
        const chart = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);

        const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 10]);

        const makeYLines = () => d3.axisLeft()
        .scale(yScale);

        chart.append('g')
        .call(d3.axisLeft(yScale));

        chart.append('g')
        .attr('class', 'grid')
        .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat(''));

        const xScale = d3.scaleBand()
        .range([0, width])
        .domain(sample.map( (s) => s.center))
        .padding(0.4);

        chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

        const barGroups = chart.selectAll()
        .data(sample)
        .enter()
        .append('g');

        barGroups
        .append("rect")
        .attr('class', 'bar')
        .attr("x", (s) => xScale(s.center))
        .attr("y", (s) => yScale(s.May2019))
        .attr("height", (s) => height - yScale(s.May2019))
        .attr("width",  xScale.bandwidth())
        .on('mouseenter', function (actual , i)
        {
          d3.selectAll(".May2019", ).attr("opacity", 0);
          d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          .attr('x', a => xScale(a.center) - 5)
          .attr('width', xScale.bandwidth() + 10);

          const y = yScale(actual.May2019);
          const line = chart.append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width)
          .attr('y2', y);

          barGroups.append('text')
          .attr('class', 'divergence')
          .attr('x', a => xScale(a.center) + xScale.bandwidth()/2)
          .attr('y', a => yScale(a.May2019)+30)
          .attr("fill", "white")
          .attr("text-anchor", "middle")
          .text((a, idx) => {
            const divergence = (a.May2019 - actual.May2019).toFixed(1);

            let text = "";
            if (divergence > 0) text += "+";
            text += `${divergence}%`;

            return idx !== i ? text : "";
          })
        });
          barGroups.on("mouseleave", function() {
            d3.selectAll(".May2019").attr("opacity", 1);
    
            d3.select(this)
              .transition()
              .duration(300)
              .attr("opacity", 1)
              .attr("x", a => xScale(a.center))
              .attr("width", xScale.bandwidth());
    
            chart.selectAll("#limit").remove();
            chart.selectAll(".divergence").remove();
          });

          barGroups
          .append("text")
          .attr("class", "May2019")
          .attr("x", a => xScale(a.center) + xScale.bandwidth() / 2)
          .attr("y", a => yScale(a.May2019) + 30)
          .attr("text-anchor", "middle")
          .text(a => `${a.May2019}%`);
    
        svg
          .append("text")
          .attr("class", "label")
          .attr("x", -(height / 2) - margin)
          .attr("y", margin / 2.4)
          .attr("transform", "rotate(-90)")
          .attr("text-anchor", "middle")
          .text("# Experiments");
    
        svg
          .append("text")
          .attr("class", "label")
          .attr("x", width / 2 + margin)
          .attr("y", height + margin * 1.7)
          .attr("text-anchor", "middle")
          .text("Center");
    
        svg
          .append("text")
          .attr("class", "title")
          .attr("x", width / 2 + margin)
          .attr("y", 40)
          .attr("text-anchor", "middle")
          .text("Experiments by Center");
    
        svg
          .append("text")
          .attr("class", "source")
          .attr("x", width - margin / 2)
          .attr("y", height + margin * 1.7)
          .attr("text-anchor", "start")
          .text("Source: HuBMAP Consortium, 2019");

        svg.append('text')
        .attr('x', -(height/2) - margin)
        .attr('y', margin/2.4)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .attr('Number of experiments (%)');
        
    }

    render()
    {
        return <div id='chartcontainer'><svg id='barchart' ref={svg => this.svg = svg} /></div>;
    }
}

export default StudiesBarChart;