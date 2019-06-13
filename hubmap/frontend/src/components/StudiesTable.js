import React from 'react';
import { connect } from 'react-redux';
import { fetch_studies, in_progress } from '../controllers/actions';
import * as Constants from '../commons/constants';
import { hubmapStore } from '../index';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
    console.log(state);
    return {
        status: state.status,
        response: state.response,
        error: state.error,
    }
};
class StudiesTable extends React.Component {
    currentState = {};
    previousState ={};
    componentDidMount() {
        console.log('componentDidMount');
        hubmapStore.subscribe(() => this.currentState = hubmapStore.getState());
        if (this.currentState != "" && this.currentState.status != Constants.IN_PROGRESS
        && this.currentState.studies != {} && this.currentState.type == Constants.GLOBAL_FETCH_ACTION) {
            this.props.dispatch(fetch_studies());
        }
        else if(this.currentState.type == Constants.GLOBAL_FETCH_ACTION && this.currentState.status == Constants.IN_PROGRESS)
        {
            this.props.dispatch(in_progress());
        }
    }

    render() {
        const { response, error, status, type } = this.currentState;
        if (error) {
            return <div>Error! {error.message}</div>
        }
        if (status == Constants.IN_PROGRESS) {
            return <div> Loading...</div>
        }
        if (response != "" && response !== undefined && type== Constants.GLOBAL_FETCH_ACTION) {
            this.previousState.response = this.currentState ;
            this.previousState.type = type;
            return (
                <table >
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th>Name</th>
                            <th>Institution</th>
                            <th>Tissue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.map(study => (
                            <tr key={study.id}>
                                <td>{study.id}</td>
                                <td>{study.institution.name}</td>
                                <td>{study.tissue.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>);
        }
        else {
            return (<div>not studies</div>);
        }
    };
}

export default connect(mapStateToProps)(StudiesTable);