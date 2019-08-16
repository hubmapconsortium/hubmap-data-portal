import React, { PureComponent } from 'react';
import { Chart } from 'react-google-charts';
import { connect } from 'react-redux';
import { get_experiments, in_progress } from '../../middleware/actions';
import * as Constants from '../../commons/constants';
import { store } from '../../index';
import { CircularProgress, Typography } from '@material-ui/core';

const mapStateToProps = state => {
    return {
        status: state.experimentState.status,
        response: state.experimentState.response,
        error: state.experimentState.error,
    }
};

class ImageCountByTissuesChart extends PureComponent {
    currentState = {};
    previousState = {};
    componentDidMount() {
        store.subscribe(() => this.currentState = store.getState().experimentState);
        if (this.currentState !== "" && this.currentState.status !== Constants.IN_PROGRESS
            && this.currentState.response !== {} && this.currentState.type === Constants.GET_EXPERIMENTS) {
            this.props.dispatch(get_experiments(this.currentState));
        }
        else if (this.currentState.type === Constants.GET_EXPERIMENTS && this.currentState.status === Constants.IN_PROGRESS) {
            this.props.dispatch(in_progress());
        }

    }
    render() {
        const { response, error, status, type } = store.getState().experimentState;

        if (error) {
            return <div>Error! {error.message}</div>
        }

        else if (response !== "" && response !== undefined && type === Constants.GET_EXPERIMENTS
            && status === Constants.SUCCESS ) {
            let values = response[response.length - 1].summary[1].image_count.reduce((arr, h) => {
                if (h !== undefined) {
                    arr.push([h[0]].concat(h[1]));
                }
                return arr;
            }, []);
            return (
                <div className="experiments-dashboard" >
                    <Chart
                        width={'420px'}
                        height={'300px'}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={values}
                        rootProps={{ 'data-testid': '6' }}
                        chartPackages={['corechart', 'controls']}

                        options={{
                            title: '# Images per Tissue, by Center',
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
                                title: 'Total # Images',
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
        else if (status === Constants.IN_PROGRESS && response === undefined && type === Constants.GET_EXPERIMENTS) {
            return < ImageCountByTissuesChart size='medium' style={{ maxWidth: '100%' }}
                title={<Typography variant='title'>Experiments From HuBMAP Consortium
        {(status === Constants.IN_PROGRESS) && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}</Typography>}
            />
        }
        else {
            return (<div>No Experiments</div>)
        }
    }
}
export default connect(mapStateToProps)(ImageCountByTissuesChart);