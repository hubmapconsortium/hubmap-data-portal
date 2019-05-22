import './App.css';
import React, {PureComponent} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Header from "./Header"
import Footer from "./Footer";
import MainContent from "./MainContent";
import Studies from "./Studies";

/* TODO: add clickable events for brain, kidney and lung tissues
*   TODO: Add api get results fron django to populate results for each tissue
*      DONE: Added organs prototype!! phew!! */

function StudiesIndex() {
	return <h2>StudiesIndex</h2>;
}

const organs = [];
organs.push({key:"brain", value: "1"}, {key: "lung", value:"2"},  {key: "kidney", value:"3"});

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
			  lung.addEventListener("mouseenter", function() {
			  	lung.setAttribute("style", "opacity:0.8;stroke:red;stroke-width:2");
			  });
			  lung.addEventListener("mouseleave", function () {
			  	lung.setAttribute("style", "opacity:0.3;stroke:pink;stroke-width:1");
			  });
			  var brain =document.getElementById('BrainHuman');
			  brain.addEventListener("click", async function() {
			  	console.log(brain.getAttribute("id"))
				  const res = await fetch('http://127.0.0.1:8000/api/tissue/1/');
			  		const studies = await res.json();
			 		 this.props.studies = studies;
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
						<Header className="App-header" />
				<MainContent studies={this.state.studies}>
					{console.log(this.state.studies)}
				</MainContent>
				<Footer/>
			</div>
		);
	}
}

export default App;