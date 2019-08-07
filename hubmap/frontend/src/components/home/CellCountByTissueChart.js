import React, { PureComponent } from 'react';
import { Chart } from 'react-google-charts';
import { connect } from 'react-redux';
import { fetch_studies, in_progress, fetchNextPageFromStudies } from '../../middleware/actions';
import * as Constants from '../../commons/constants';
import { store } from '../../index';
import  {CircularProgress, Typography } from '@material-ui/core';

const mapStateToProps = state => {
    return {
        status: state.studyState.status,
        response: state.studyState.response,
		error: state.studyState.error,
		count: state.studyState.count,
    }
};

  class CellCountByTissueChart extends PureComponent {
    currentState = {};
	previousState ={};
    componentDidMount() {
        store.subscribe(() => this.currentState = store.getState().studyState);
        if (this.currentState !== "" && this.currentState.status !== Constants.IN_PROGRESS
        && this.currentState.studies !== {} && this.currentState.type === Constants.GLOBAL_FETCH_ACTION) {
			console.log(this.currentState);
            this.props.dispatch(fetch_studies(this.currentState));
        }
        else if(this.currentState.type === Constants.GLOBAL_FETCH_ACTION && this.currentState.status === Constants.IN_PROGRESS)
        {
            this.props.dispatch(in_progress());
        }
		
    }
    render() {
        const { response, error, status, type, count } = store.getState().studyState;

          if (error) {
            return <div>Error! {error.message}</div>
		}
		
		else if (response !== "" && response !== undefined && type === Constants.GLOBAL_FETCH_ACTION 
		&&  status === Constants.SUCCESS) 
		{
            console.log(response[response.length-1]);
            let values = response[response.length-1].summary[0].cell_count.reduce((arr, h) => {
                if (h !== undefined) {
                  arr.push([h[0]].concat(h[1]));
                }
                return arr;
              }, []);
        return (
            
            <div className="studieschart" >
                <Chart id="studiesbyUniversitychart"
                    width={'400px'}
                    height={'300px'}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={values}
                    options={{
                        title: '# of Cells per Tissue, by Center',
                        chartArea: { width: '50%', fill: "#fafafa" },
                        colors: ['#1f77b4',
                        '#ff7f0e',
                        '#2ca02c',
                        '#d62728',
                        '#9467bd',
                        '#8c564b',
                        '#e377c2',
                        '#7f7f7f',
                        '#bcbd22',
                        '#17becf'],
                        isStacked: true,
                        hAxis: {
                            title: 'Total # Cells',
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

                    // For tests
                    rootProps={{ 'data-testid': '3' }}
                />
            </div>
        );
                }
                else if(status === Constants.IN_PROGRESS && response === undefined && type=== Constants.GLOBAL_FETCH_ACTION  )
		{
			return < CellCountByTissueChart size='medium' style={{ maxWidth: '100%'}}
					title={<Typography variant='title'>Experiments From HuBMAP Consortium
					{(status === Constants.IN_PROGRESS) && <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}} />}</Typography> }
					/>
		}
		else
		{
			console.log(status, response, type, store.getState(), this.previousState);
			return (<div>No Experiments</div>)
		}
    }
}
export default connect(mapStateToProps)(CellCountByTissueChart)
//() => (
  //  <StudiesChart />
//)