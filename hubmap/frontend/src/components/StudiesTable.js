import React from 'react';
import {connect} from 'react-redux';
import { fetchStudies } from '../controllers/actions';


const mapStateToProps = state => {
    return {
        studies: state.studies,
        error: state.error,
        isFetching: state.isFetching
    }
};

class StudiesTable extends React.Component{

    componentDidMount()
    {
        console.log('componentDidMount');
        this.props.dispatch(fetchStudies());
    }

    render() {
        console.log(this.props);
        const {studies, isFetching, error} = this.props;
        if (error){
            return <div>Error! {error.message}</div>
        }
        if (isFetching) {
            return <div> Loading...</div>
        }
        if (studies != "") {
            console.log(studies);
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
                    {studies.map(study => (
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