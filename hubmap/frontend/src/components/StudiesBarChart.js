import React, { PureComponent } from 'react';
import { Chart } from 'react-google-charts';
const data = {"summary":[["Abdomen",[["Caltech",0],["Florida",0],["Stanford",0],["UCSD",0],["Vanderbilt",0]]],["Bladder",[["Caltech",0],["Florida",0],["Stanford",0],["UCSD",0],["Vanderbilt",0]]],["Colon",[["Caltech",0],["Florida",0],["Stanford",17],["UCSD",0],["Vanderbilt",0]]],["Heart",[["Caltech",0],["Florida",0],["Stanford",0],["UCSD",0],["Vanderbilt",0]]],["Kidney",[["Caltech",0],["Florida",0],["Stanford",0],["UCSD",0],["Vanderbilt",0]]],["LargeIntestine",[["Caltech",0],["Florida",0],["Stanford",0],["UCSD",0],["Vanderbilt",0]]],["Liver",[["Caltech",0],["Florida",0],["Stanford",0],["UCSD",0],["Vanderbilt",18]]],["Lungs",[["Caltech",0],["Florida",0],["Stanford",13],["UCSD",0],["Vanderbilt",13]]],["Pancreas",[["Caltech",0],["Florida",0],["Stanford",0],["UCSD",0],["Vanderbilt",0]]],["SmallIntestine",[["Caltech",0],["Florida",0],["Stanford",0],["UCSD",0],["Vanderbilt",0]]],["Spleen",[["Caltech",0],["Florida",0],["Stanford",0],["UCSD",0],["Vanderbilt",23]]]]};
class StudiesChart extends PureComponent {

    render() {
        console.log(data.summary);
        const summary = ["Tissue", ]
        data.summary.map(function(tissue) {
            console.log(tissue)
        })
        return (
            <div className="studieschart" >
                <Chart id="studiesbyUniversitychart"
                    width={'400px'}
                    height={'300px'}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Tissue', 'Institution', 'cell'],
                        ['Florida', 5, 8],
                        ['Vanderbilt', 8, 22],
                        ['Stanford', 8, 18],
                        ['Caltech', 5, 18],
                        ['UCSD', 5, 18],
                    ]}
                    options={{
                        title: '# of Experiments per month, by Center',
                        chartArea: { width: '50%', fill: "#fafafa" },
                        colors: ['#42a5f5', '#ffc400', '#66bb6a'],
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