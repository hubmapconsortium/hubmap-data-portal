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
            <div className="studiesdashboard" >
            <Chart
                width={'400px'}
                height={'200px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                        ['Tissue', 'May 2019', 'June 2019'],
                        ['Lung', 5, 8],
                        ['Spleen', 8, 14],
                        ['Kidney', 5, 18],
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
                    title: '# of Studies per month, by Tissues',
                    chartArea: { width: '55%', fill:"#fafafa"},
                    colors: ['#42a5f5', '#4caf50', '#ffab00'],
                    isStacked: true,
                    hAxis: {
                    title: 'Total # Studies',
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