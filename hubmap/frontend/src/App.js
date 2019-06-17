import './App.css';
import React, {PureComponent} from 'react';
import RootContainer from './components/RootContainer';
import { getTissueColorsFromServer, fetchAllStudies } from './middleware/actions';
import {connect} from 'react-redux';

//import '@google/model-viewer' ;
//npm run setup -- --spaceId eo4e2dc0pbyt --deliveryToken H3bSZhVoA8_0_hjDzD6yGsq1jHCdBgxop3iJ9EM54B8 --managementToken CFPAT-nXzmTIQFv4Om1KFSnqn0fS3X7_3YLXDacst4IC52_1M
/* TODO: add chart
*   DONE: Add api get results fron django to populate results for each tissue
*      DONE: Added organs prototype + clickable+rest api!! phew!! */


class App extends PureComponent {

    componentDidMount() {
        this.props.dispatch(fetchAllStudies());
        this.props.dispatch(getTissueColorsFromServer());
    }

    render() {

		return (
            <div className="App">

                <RootContainer />
			</div>

		);
	}
}
export default connect() (App);