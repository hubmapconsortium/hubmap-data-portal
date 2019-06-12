import { ReactComponent as ReactComp } from "../images/Human_body_silhouette_minimal.svg";
import React from 'react';
import PureComponent from 'react';
import clsx from "clsx";
import grey from '@material-ui/core/colors/grey';
import { Container } from "@material-ui/core";
import data from './data';
import { fetch_colors, in_progress } from "../controllers/actions";
import * as Constants from '../commons/constants';
import { hubmapStore } from '../index';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    console.log(state);
    return {
        status: state.status,
        response: state.response,
        error: state.error,
    }
};

const cellcount = data;
var humanSvg, tooltip, tooltipText, tooltipRects, tooltipTsspan;
function updateText(tspanId, txt) {
	var spanEl = document.getElementById(tspanId);
	while (spanEl.firstChild) {
		spanEl.removeChild(spanEl.firstChild);
	}
	spanEl.appendChild(document.createTextNode(txt));
}

function showToolTip(evt) {
	var CTM = humanSvg.getScreenCTM();
	var mousex = (evt.clientX - CTM.e + 6) / CTM.a;
	var mousey = (evt.clientY - CTM.f + 20) / CTM.d;
	var x = (evt.clientX - CTM.e + 6) / CTM.a;
	var y = (evt.clientY - CTM.f + 20) / CTM.d;
	tooltip.setAttributeNS(null, "transform", "translate(" + mousex + " " + mousey + ")");
	tooltip.setAttributeNS(null, "visibility", "visible");
	var lines = evt.target.getAttributeNS(null, "data-tooltip-text").split(',');
	tooltipText.firstChild.data = lines[0];
	updateText("tspanid", lines[1]);
	updateText("tspanid2", lines[2]);
	var length = tooltipText.getComputedTextLength();

	for (var i = 0; i < tooltipRects.length; i++) {
		tooltipRects[i].setAttributeNS(null, "width", length + 2);
		tooltipRects[i].setAttributeNS(null, "height", 30);
		tooltipRects[i].setAttributeNS(null, "font-size", 5);
	}
	this.setAttribute('opacity', 0.6);
}

function hideToolTip(evt) {
	tooltip.setAttributeNS(null, "visibility", "hidden");
	this.setAttribute('opacity', 1);
}

class HumanAnatomyCard extends React.Component {
	currentState = {};
	constructor(props) {
		super(props);
	}

	componentDidMount()
	{
		try
		{
			hubmapStore.subscribe(() => this.currentState = hubmapStore.getState());
			console.log(this.currentState);
			if (this.currentState != "" && this.currentState.status != Constants.IN_PROGRESS && this.currentState.response!=""
			&& this.currentState.type == Constants.GET_TISSUE_COLORS) {
				this.props.dispatch(fetch_colors());
			}
			else{
				this.props.dispatch(in_progress());
			}
			//this.props.dispatch(fetch_colors());
			//hubmapStore.subscribe(() => this.currentState = hubmapStore.getState());
			//const {colors, isFetching, error, status} = this.currentState;
			console.log(this.currentState);
			//first get svg
			console.log(cellcount);
			humanSvg = document.getElementById('human');
			tooltip = humanSvg.getElementById('tooltip');
			tooltipText = tooltip.getElementsByTagName('text')[0];
			tooltipRects = tooltip.getElementsByTagName('rect');
			tooltipTsspan = tooltip.getElementsByTagName('tspan');
			var pathTriggers = humanSvg.getElementsByClassName('tooltip-trigger');
			for (var i = 0; i < pathTriggers.length; i++) {
				pathTriggers[i].addEventListener('mousemove', showToolTip);
				pathTriggers[i].addEventListener('mouseout', hideToolTip);
				//pathTriggers[i].addEventListener('mouseover', setHover);
			}

			var pancreas = document.getElementById('pancreas');
			pancreas.setAttributeNS(null, "data-tooltip-text", " " + cellcount[3].tissue + "," + cellcount[3].cells + " experiments," + cellcount[3].gene + " gene");
			pancreas.addEventListener("click", async function () {
				console.log(pancreas.getAttribute("id"));
				console.log(cellcount);

			});

			var abdomen = document.getElementById('abdomen');
			abdomen.setAttributeNS(null, "data-tooltip-text", " " + cellcount[8].tissue + "," + cellcount[8].cells + " experiments," + cellcount[8].gene + " gene");
			abdomen.addEventListener("click", async function () {
				console.log(abdomen.getAttribute("id"))
				var chart = document.getElementById('studiesbyTissueschart');
				// Create our table.
				var barChart = document.getElementById('studiesbyTissueschart');
				//barChart.draw(data, options);
				console.log(chart);
				//do something here get studies where tissue = brain
			});

			var liver = document.getElementById('liver');
			liver.setAttributeNS(null, "data-tooltip-text", " " + cellcount[5].tissue + "," + cellcount[5].cells + " experiments," + cellcount[5].gene + " gene");
			liver.addEventListener("click", function () {
				console.log(liver.getAttribute("id"));
				//do something here get studies where tissue = kidney
			});

			var lungs = document.getElementById('lungs');
			lungs.setAttributeNS(null, "data-tooltip-text", " " + cellcount[0].tissue + "," + cellcount[0].cells + " experiments," + cellcount[0].gene + " gene");
			lungs.addEventListener("click", function () {
				console.log(lungs.getAttribute("id"));
				//do something here get studies where tissue = kidney
			});
			var smallIntestine = document.getElementById('sIntestine');
			smallIntestine.setAttributeNS(null, "data-tooltip-text", " " + cellcount[6].tissue + "," + cellcount[6].cells + " experiments," + cellcount[6].gene + " gene");
			smallIntestine.addEventListener("click", function () {
				console.log(smallIntestine.getAttribute("id"));
				//do something here get studies where tissue = kidney
			});
			var heart = document.getElementById('heart');
			heart.setAttributeNS(null, "data-tooltip-text", " " + cellcount[4].tissue + "," + cellcount[4].cells + " experiments," + cellcount[4].gene + " gene");
			heart.addEventListener("click", function () {
				console.log(heart.getAttribute("id"));
				//do something here get studies where tissue = kidney
			});
			var bladder = document.getElementById('bladder');
			bladder.setAttributeNS(null, "data-tooltip-text", " Bladder: , No data");
			bladder.addEventListener("click", function () {
				console.log(bladder.getAttribute("id"));
				//do something here get studies where tissue = kidney
			});
			var largeIntestine = document.getElementById('lIntestine');
			largeIntestine.setAttributeNS(null, "data-tooltip-text", " " + cellcount[7].tissue + "," + cellcount[7].cells + " experiments," + cellcount[7].gene + " gene");
			largeIntestine.addEventListener("click", function () {
				console.log(largeIntestine.getAttribute("id"));
				//do something here get studies where tissue = largeIntestine
			});
			var kidney = document.getElementById('kidney');
			kidney.setAttributeNS(null, "data-tooltip-text", " " + cellcount[2].tissue + "," + cellcount[2].cells + " experiments," + cellcount[2].gene + " gene");
			kidney.addEventListener("click", function () {
				console.log(kidney.getAttribute("id"));
				//do something here get studies where tissue = kidney
			});
			var spleen = document.getElementById('spleen');
			spleen.setAttributeNS(null, "data-tooltip-text", " " + cellcount[1].tissue + ", " + cellcount[1].cells + " experiments," + cellcount[1].gene + " gene");
			spleen.addEventListener("click", function () {
				console.log(spleen.getAttribute("id"));
				//do something here get studies where tissue = spleen
			});
			var human = document.getElementById('main');
			human.setAttributeNS(null, "data-tooltip-text", " #Total, experiments: " + "248, 9 genes");

		}
		catch (e) {
			console.log(e);
		}
	}

	render() {
		return (
			<ReactComp />
		);
	}
}
export default connect(mapStateToProps) (HumanAnatomyCard);