// TODO!
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import { Chart } from 'react-google-charts';
import { connect } from 'react-redux';
import { CircularProgress, Typography } from '@material-ui/core';
import { getExperimentsResponse, inProgress } from '../../middleware/actions';
import * as Constants from '../../commons/constants';
import store from '../../middleware/store';

const mapStateToProps = (state) => ({
  status: state.experimentState.status,
  response: state.experimentState.response,
  error: state.experimentState.error,
});

class CellCountByTissueChart extends PureComponent {
    currentState = {};

    previousState = {};

    componentDidMount() {
      store.subscribe(() => this.currentState = store.getState().experimentState);
      if (this.currentState !== '' && this.currentState.status !== Constants.IN_PROGRESS
            && this.currentState.response !== {} && this.currentState.type === Constants.GET_EXPERIMENTS) {
        this.props.dispatch(getExperimentsResponse(this.currentState));
      } else if (this.currentState.type === Constants.GET_EXPERIMENTS && this.currentState.status === Constants.IN_PROGRESS) {
        this.props.dispatch(inProgress());
      }
    }

    render() {
      const {
        response, error, status, type,
      } = store.getState().experimentState;

      if (error) {
        return (
          <div>
Error!
            {error.message}
          </div>
        );
      }

      if (response !== '' && response !== undefined && type === Constants.GET_EXPERIMENTS
            && status === Constants.SUCCESS) {
        const values = response[response.length - 1].summary[0].cell_count.reduce((arr, h) => {
          if (h !== undefined) {
            arr.push([h[0]].concat(h[1]));
          }
          return arr;
        }, []);
        return (

          <div className="experimentschart">
            <Chart
              id="experimentsbyUniversitychart"
              width="420px"
              height="300px"
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data={values}
              options={{
                title: '# of Cells per Tissue, by Center',
                chartArea: { width: '50%', fill: '#fafafa' },
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
      if (status === Constants.IN_PROGRESS && response === undefined && type === Constants.GET_EXPERIMENTS) {
        return (
          <CellCountByTissueChart
            size="medium"
            style={{ maxWidth: '100%' }}
            title={(
              <Typography variant="title">
Experiments From HuBMAP Consortium
                {(status === Constants.IN_PROGRESS) && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
              </Typography>
)}
          />
        );
      }

      return (<div>No Experiments</div>);
    }
}
export default connect(mapStateToProps)(CellCountByTissueChart);
// () => (
//  <StudiesChart />
// )
