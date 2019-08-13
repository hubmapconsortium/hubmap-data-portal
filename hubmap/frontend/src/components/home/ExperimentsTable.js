import React from 'react';
import { connect } from 'react-redux';
import { get_experiments, in_progress } from '../controllers/actions';
import * as Constants from '../../commons/constants';
import { hubmapStore } from '../../index';
import MaterialTableDemo from './MUITable';

const mapStateToProps = state => {
    return {
        status: state.status,
        response: state.response,
        error: state.error,
        count: 0,
        page: 0,
        next: "",
        previous: "",
    }
};
class ExperimentsTable extends React.Component {
    currentState = {};
    previousState = {};
    componentDidMount() {
        ('componentDidMount');
        hubmapStore.subscribe(() => this.currentState = hubmapStore.getState());
        if (this.currentState !== "" && this.currentState.status !== Constants.IN_PROGRESS
            && this.currentState.response !== {} && this.currentState.type === Constants.GET_EXPERIMENTS) {
            this.props.dispatch(get_experiments());
        }
        else if (this.currentState.type === Constants.GET_EXPERIMENTS && this.currentState.status === Constants.IN_PROGRESS) {
            this.props.dispatch(in_progress());
        }
    }

    render() {
        const { response, error, status, type, page, count, next, previous } = this.currentState;
        if (error) {
            return <div>Error! {error.message}</div>
        }
        if (status === Constants.IN_PROGRESS) {
            return <div> Loading...</div>
        }
        if (response !== "" && response !== undefined && type === Constants.GET_EXPERIMENTS) {
            this.previousState.response = this.currentState;
            this.previousState.type = type;
            return (
                <div>
                    <MaterialTableDemo experiments={response} /> </div>);
        }
        /*else if(type !== Constants.GET_EXPERIMENTS && response !== "")
        /{
            (this.previousState);
        }*/
        else {
            return (<div>no experiments </div>);
        }
    };
}

export default connect(mapStateToProps)(ExperimentsTable);
