import React from 'react';
import { connect } from 'react-redux';
import { fetch_studies, in_progress } from '../controllers/actions';
import * as Constants from '../../commons/constants';
import { hubmapStore } from '../../index';
import MaterialTableDemo from './MUITable';

const mapStateToProps = state => {
    (state);
    return {
        status: state.status,
        response: state.response,
        error: state.error,
        count: 0,
        page:0,
        next: "",
        previous: "",
    }
};
class StudiesTable extends React.Component {
    currentState = {};
    previousState ={};
    componentDidMount() {
        ('componentDidMount');
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
        const { response, error, status, type , page, count, next, previous} = this.currentState;
        if (error) {
            return <div>Error! {error.message}</div>
        }
        if (status == Constants.IN_PROGRESS) {
            return <div> Loading...</div>
        }
        if (response != "" && response !== undefined && type== Constants.GLOBAL_FETCH_ACTION) {
            this.previousState.response = this.currentState ;
            this.previousState.type = type;
            (response);
            return (
                <div>

                <MaterialTableDemo studies = {response} /> </div>);
        }
        /*else if(type != Constants.GLOBAL_FETCH_ACTION && response != "")
        /{
            (this.previousState);
        }*/
        else {
            return (<div>no studies </div>);
        }
    };
}

export default connect(mapStateToProps)(StudiesTable);