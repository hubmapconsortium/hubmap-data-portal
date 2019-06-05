import React, {PureComponent} from 'react';
import {Chart} from 'react-google-charts';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';

class StudiesDashboard extends PureComponent{

    constructor(props) {
        super(props);
        }

render() {
        return (
            <div className="studiesdashboard" id="studiesbyTissueschart" >
            <Chart 
                width={'380px'}
                height={'200px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                        ['Cells', 'May 2019', 'June 2019'],
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
                render={({ renderControl, renderChart }) => {
                    return (
                    <div style={{ display: 'block' }}>
                        <div style={{ width: '30%' }}>{renderControl(() => true)}</div>
                        <div style={{ width: '60%' }}>{renderChart()}</div>
                    </div>
                    )
                }}
                options={{
                    title: '# of Cells per month',
                    chartArea: { width: '55%', fill:"#fafafa"},
                    colors: ['#42a5f5', '#4caf50', '#ffab00'],
                    isStacked: true,
                    hAxis: {
                    title: 'Total # Cells',
                    minValue: 0,
                    },
                    vAxis: {
                    title: 'Tissues',
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