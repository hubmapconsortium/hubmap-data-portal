import './App.css';
import React, {PureComponent} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer";
import HumanSvg from "./components/HumanSvg";
import NavBar from "./components/NavBar";
import TextField from '@material-ui/core/TextField'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import PropTypes from "prop-types";
import StudiesChart from "./components/StudiesBarChart"
import StudiesDashboard from './components/StudiesDashboard';
import StudyD3BarChart from './components/StudyD3BarChart';
import RootContainer from './components/RootContainer';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { GLOBAL_FETCH_ACTION } from './controllers/actions';
import reducer from './controllers/reducer'
import thunk from 'redux-thunk';

const hubmapStore = createStore(reducer, applyMiddleware(thunk));

//import '@google/model-viewer' ;
//npm run setup -- --spaceId eo4e2dc0pbyt --deliveryToken H3bSZhVoA8_0_hjDzD6yGsq1jHCdBgxop3iJ9EM54B8 --managementToken CFPAT-nXzmTIQFv4Om1KFSnqn0fS3X7_3YLXDacst4IC52_1M
/* TODO: add chart
*   TODO: Add api get results fron django to populate results for each tissue
*      DONE: Added organs prototype + clickable+rest api!! phew!! */

const styles = theme => ({
    root: {
        textAlign: "center",
        paddingTop: theme.spacing.unit * 20
    }
});

function StudiesIndex() {
	return <h2>StudiesIndex</h2>;
}

/*const model = document.createElement('model-viewer');
model.src = './images/gltf/BrainModel-Gray.gltf';

document.body.appendChild(model);*/

class App extends PureComponent {

    render() {
        
		return (
            <div className="App">
                <Provider store={hubmapStore}>
                <RootContainer />
                </Provider>
                {/* <NavBar />
                <div className={"mainContent"}>
				<HumanSvg studies={this.state.studies}>
					{console.log(this.state.studies)}
				</HumanSvg>
				<StudiesChart />
				<StudiesDashboard />
                <Footer />
                </div> */}
			</div>

		);
	}
}
export default App;