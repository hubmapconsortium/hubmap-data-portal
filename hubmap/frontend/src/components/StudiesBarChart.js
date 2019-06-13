import React, { PureComponent } from 'react';
import { Chart } from 'react-google-charts';

class StudiesChart extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="studieschart" >
                <Chart id="studiesbyUniversitychart"
                    width={'400px'}
                    height={'300px'}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Center', 'May 2019', 'June 2019'],
                        ['Florida', 5, 8],
                        ['Vanderbilt', 8, 22],
                        ['Stanford', 8, 18],
                        ['Caltech', 5, 18],
                        ['UCSD', 5, 18],
                    ]}
                    options={{
                        title: '# of Experiments per month, by Center',
                        chartArea: { width: '50%', fill: "#fafafa" },
                        colors: ['#42a5f5', '#ffab00', '#4caf50'],
                        isStacked: true,
                        hAxis: {
                            title: 'Total # Experiments',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'Center',
                        },
                    }}
                    controls={[
                        {
                            controlType: 'StringFilter',
                            options: {
                                filterColumnIndex: 0,
                                matchType: 'any', // 'prefix' | 'exact',
                                ui: {
                                    label: 'Search by Center',
                                },
                            },
                        },
                    ]}

                    // For tests
                    rootProps={{ 'data-testid': '3' }}
                />
            </div>
        );
    }
}
export default () => (
    <StudiesChart />
)