import React from 'react';
import {connect} from 'react-redux';
import { fetch_studies } from '../controllers/actions';
import * as Constants from '../commons/constants';
import {hubmapStore} from '../index';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
    console.log(state);
    return {
        status:state.status,
        studies: state.response,
        error: state.error,
        isFetching: state.isFetching
    }
};
class StudiesTable extends React.Component{
    currentState = {};
    componentDidMount()
    {
        console.log('componentDidMount');
        hubmapStore.subscribe(() => this.currentState = hubmapStore.getState());
        this.props.dispatch(fetch_studies());
    }

    render() {
         console.log(this.currentState);
         const {response, isFetching, error, status} = this.currentState;
        console.log(response);
        if (error){
            return <div>Error! {error.message}</div>
        }
        if (isFetching) {
            return <div> Loading...</div>
        }
        if (response != "" && response !== undefined) {
            console.log(response);
            return(
                <table >
                    <thead>
                    <tr style={{textAlign: 'center'}}>
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
            else{
                return (<div>studies empty</div>);
            }
    };
}

export default connect(mapStateToProps) (StudiesTable);