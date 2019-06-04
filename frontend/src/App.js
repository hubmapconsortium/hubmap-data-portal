import './App.css';
import React, {PureComponent} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import NavBar from "./components/NavBar";
import TextField from '@material-ui/core/TextField'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import PropTypes from "prop-types";
import StudiesChart from "./components/StudiesChart"

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

function ElevationScroll(props) {
    const { children } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.node.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    window: PropTypes.func,
};

function StudiesIndex() {
	return <h2>StudiesIndex</h2>;
}
const organs = [];
organs.push({key:"brain", value: "1"}, {key: "lung", value:"2"},  {key: "kidney", value:"3"});
/*const model = document.createElement('model-viewer');
model.src = './images/gltf/BrainModel-Gray.gltf';

document.body.appendChild(model);*/

class App extends PureComponent {
 
	constructor(props) {
        super(props);
        this.state = {
            studies: []
        };
    }

	async componentDidMount() {
		try {
			 const res = await fetch('http://127.0.0.1:8000/api/');
			 const studies = await res.json();
			  this.setState({
				studies
			  });
			  var lung =document.getElementById('LungHuman');
			  lung.addEventListener("click", async function() {
			  	console.log(lung.getAttribute("id"));
			  		const res = await fetch('http://127.0.0.1:8000/api/tissue/2/');
			  });
            lung.addEventListener("mouseenter", function () {
                console.log("lung");
			  	lung.setAttribute("style", "fill:green;opacity:0.8;stroke:red;stroke-width:2");
			  });
			  lung.addEventListener("mouseleave", function () {
			  	lung.setAttribute("style", "opacity:0.3;stroke:pink;stroke-width:1");
			  });
			  var brain =document.getElementById('BrainHuman');
			  brain.addEventListener("click", async function() {
			  	console.log(brain.getAttribute("id"))
				  const res = await fetch('http://127.0.0.1:8000/api/tissue/1/');
			  		const studies = await res.json();
			 		 //this.props.studies = studies;
				  //do something here get studies where tissue = brain
			  });
			  brain.addEventListener("mouseenter", function() {
			  	brain.setAttribute("style", "opacity:0.8;stroke:blue;stroke-width:2");
			  });
			   brain.addEventListener("mouseleave", function () {
			  	brain.setAttribute("style", "opacity:0.3;stroke:blue;stroke-width:1");
			  });
			  var kidney =document.getElementById('Kidney');
				kidney.addEventListener("click", function() {
			  	console.log(kidney.getAttribute("id"))
					//do something here get studies where tissue = kidney
			  });
			  kidney.addEventListener("mouseenter", function() {
			  	kidney.setAttribute("style", "opacity:0.8;stroke:green;stroke-width:2");
			  });
			  kidney.addEventListener("mouseleave", function () {
			  	kidney.setAttribute("style", "opacity:0.3;stroke:green;stroke-width:1");
			  });
		}
		catch (e) {
		  console.log(e);
		}
    }

   
    render() {

		return (
            <div className="App">
                <NavBar />
				<MainContent studies={this.state.studies}>
					{console.log(this.state.studies)}
				</MainContent>
				<StudiesChart />
                <Footer />
			</div>

		);
	}
}

export default App;