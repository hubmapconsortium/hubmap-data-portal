import React, {PureComponent} from 'react';
import {Chart} from 'react-google-charts';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';

class StudiesChart extends PureComponent{

    constructor(props) {
        super(props);
        }

render() {
        return (
            <div className="studieschart" >
            <Chart
            width={'400px'}
            height={'250px'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['University', 'May 2019', 'June 2019'],
                ['Indiana', 5, 8],
                ['CMU', 8, 22],
                ['Havard', 8, 18],
                ['UCSC', 5, 18],
                ['Stanford', 5, 18],
            ]}
            options={{
                title: '# of Studies per month, by University',
                chartArea: { width: '50%', fill:"#fafafa"},
                colors: ['#42a5f5', '#ffab00', '#4caf50'],
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
                    label: 'Search by University',
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