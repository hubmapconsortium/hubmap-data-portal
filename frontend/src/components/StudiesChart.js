import React, {PureComponent} from 'react';
import {Chart} from 'react-google-charts';
class StudiesChart extends PureComponent{
    constructor(props) {
        super(props);
        }

render() {
        return (
            <Chart
            width={'200px'}
            height={'200px'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['Tissue', 'May 2019', 'June 2019'],
                ['Lung', 5, 8],
                ['Spleen', 8, 14],
                ['Kidney', 5, 18],
            ]}
            options={{
                title: '# of Studies per month, by Tissues',
                chartArea: { width: '50%' },
                isStacked: true,
                hAxis: {
                title: 'Total # Studies',
                minValue: 0,
                },
                vAxis: {
                title: 'Tissues',
                },
            }}
            chartEvents={this.chartEvents}
            // For tests
            rootProps={{ 'data-testid': '3' }}
            />
        ); 
    }
}
export default () => (
    <StudiesChart />
)