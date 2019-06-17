import React, { PureComponent } from 'react';
import { Chart } from 'react-google-charts';

class StudiesDashboard extends PureComponent {

    render() {
        return (
            <div className="studiesdashboard" id="studiesbyTissueschart" >
                <Chart
                    width={'390px'}
                    height={'300px'}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Experiments', 'May 2019', 'June 2019'],
                        ['Lung', 5, 8],
                        ['Spleen', 6, 14],
                        ['Kidney', 5, 18],
                        ['Pancreas', 7, 15],
                        ['Heart', 12, 18],
                        ['Liver', 13, 19],
                        ['SIntestine', 16, 23],
                        ['LIntestine', 17, 21],
                        ['Abdomen', 11, 21],

                    ]}
                    rootProps={{ 'data-testid': '6' }}
                    chartPackages={['corechart', 'controls']}

                    options={{
                        title: '# of Experiments per month',
                        chartArea: { width: '50%', fill: "#fafafa" },
                        colors: ['#42a5f5', '#4caf50', '#ffab00'],
                        isStacked: true,
                        hAxis: {
                            title: 'Total # Experiments',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'Tissue',
                        },
                    }}
                    controls={[
                        {
                            controlType: 'StringFilter',
                            options: {
                                filterColumnIndex: 0,
                                matchType: 'any', // 'prefix' | 'exact',
                                ui: {
                                    label: 'Search by Tissue',
                                },
                            },
                        },
                    ]}
                />
            </div>
        );
    }
}
export default () => (
    <StudiesDashboard />
)