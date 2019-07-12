import './App.css';
import React from 'react';
import RootContainer from './components/RootContainer';
import * as actions from './middleware/Actions';


class App extends React.Component {

    componentDidMount() {
        actions.fetchAllStudies();
        actions.getTissueColorsFromServer();
        actions.getGeneTissueColors();
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