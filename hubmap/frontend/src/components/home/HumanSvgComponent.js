import { ReactComponent as ReactComp } from "../../images/Human_body_silhouette_minimal.svg";
import React from 'react';
import data from './data';
import { fetch_colors, in_progress } from "../../middleware/actions";
import * as Constants from '../../commons/constants';
import { store } from '../../index';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	console.log(state.colorsState);
	return {
		status: state.colorsState.status,
		response: state.colorsState.response,
		error: state.colorsState.error,
	}
};

var pancreas, heart, lung, smallIntestine, largeIntestine,
	abdomen, liver, bladder, kidney, spleen, human;

const cellcount = data;
var genetissueArray={};
var humanSvg, tooltip, tooltipText, tooltipRects;
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
	console.log(evt.target.getAttributeNS(null, "data-tooltip-text"));
	var lines = evt.target.getAttributeNS(null, "data-tooltip-text").split(',');
	tooltipText.firstChild.data = lines[0];
	console.log(typeof(tooltipText.firstChild));
	updateText("tspanid", lines[1]);
	//updateText("tspanid2", lines[2]);
	var length = tooltipText.getComputedTextLength();

	for (var i = 0; i < tooltipRects.length; i++) {
		tooltipRects[i].setAttributeNS(null, "width", length+10 );
		tooltipRects[i].setAttributeNS(null, "height", 30);
		tooltipRects[i].setAttributeNS(null, "font-size", 2);
	}
	this.setAttribute('opacity', 0.6);
}

function hideToolTip(evt) {
	tooltip.setAttributeNS(null, "visibility", "hidden");
	this.setAttribute('opacity', 1);
}
//console.log(ev);
//tissue.style.removeProperty("animation");
class HumanAnatomyCard extends React.Component {
	currentState = {};
	previousState = {};
	studyState = {};
	geneTissueColorState = {};
	
	componentDidMount() {

		try {
			store.subscribe(() => {this.currentState = store.getState().colorsState;
			this.studyState = store.getState().studyState;
			this.geneTissueColorState = store.getState().geneTissueColorState});
			console.log(this.studyState);
			if (this.currentState !== "" && this.currentState.status !== Constants.IN_PROGRESS && this.currentState.response !== ""
				&& this.currentState.type === Constants.GET_TISSUE_COLORS) 
			{
				console.log('get tissue colors', this.currentState);
				this.props.dispatch(fetch_colors());
			}
			else 
			{
				this.props.dispatch(in_progress());
			}
		}
		catch (e) {
			console.log(e);
		}
	}

	render() {
		const { response, error, status, type } = store.getState().colorsState;
		this.currentState =store.getState().colorsState;
		this.studyState = store.getState().studyState;
		this.geneTissueColorState = store.getState().geneTissueColorState;
		console.log(response, error, status, type);
		console.log(this.studyState.response, this.studyState.status);
		if (this.studyState !== undefined && this.studyState.response !== undefined 
			&& this.studyState.status !== Constants.FAILURE && this.studyState.status!== "" ) 
		{
			var results = this.studyState.response.response;
			console.log(this.studyState.response);
			var tissues = [...new Set(this.studyState.response.slice(0,this.studyState.response.length-1)
			.map(study => (study.tissue.name) ))];

			this.genetissueArray = this.studyState.response.slice(0,this.studyState.response.length-1)
			.reduce((arr, study) =>
				{
					const index = arr.findIndex((e) =>  e.tissue === study.tissue.name)
					if(index ===-1)
					{
						arr.push(
						{
							'tissue': study.tissue.name,
							'genescount': study.genes !== undefined ? study.genes.length : 0,
						});
					}
					else{
						arr[index ] = {'tissue': study.tissue.name,'genescount':study.genes !== undefined ? study.genes.length : 0};
					}
					return arr;
				}
				, []);
		}
		console.log(this.genetissueArray);
		if (response !== "" && response !== undefined
			&& type === Constants.GET_TISSUE_COLORS) {
			this.previousState = this.currentState;
			var colors = this.currentState.response;
			console.log(this.currentState);
			console.log(this.currentState, this.geneTissueColorState);
			//first get svg
			const datatooltip ="";
			humanSvg = document.getElementById('human');
			tooltip = humanSvg.getElementById('tooltip');
			tooltipText = tooltip.getElementsByTagName('text')[0];
			tooltipRects = tooltip.getElementsByTagName('rect');
			var pathTriggers = humanSvg.getElementsByClassName('tooltip-trigger');
			
			pancreas = document.getElementById('pancreas');
			pancreas.setAttributeNS(null, "data-tooltip-text", "Pancreas, No gene data available");
			pancreas.addEventListener("click", async function () {
				console.log(pancreas.getAttribute("id"));
				console.log(cellcount);
			});

			abdomen = document.getElementById('abdomen');
			abdomen.setAttributeNS(null, "data-tooltip-text", "Abdomen, No gene data available");
			abdomen.addEventListener("click", async function () {
				console.log(abdomen.getAttribute("id"))
			});

			liver = document.getElementById('liver');
			liver.setAttributeNS(null, "data-tooltip-text", "Liver, No gene data available");
			liver.addEventListener("click", function () {
				console.log(liver.getAttribute("id"));
			});

			lung = document.getElementById('lung');
			lung.setAttributeNS(null, "data-tooltip-text", "Lung, No gene data available");
			lung.addEventListener("click", function () {
				console.log(lung.getAttribute("id"));
			});
			smallIntestine = document.getElementById('smallIntestine');
			smallIntestine.setAttributeNS(null, "data-tooltip-text", "Small Intestine, No gene data available");
			smallIntestine.addEventListener("click", function () {
				console.log(smallIntestine.getAttribute("id"));
			});
			heart = document.getElementById('heart');
			heart.setAttributeNS(null, "data-tooltip-text", "Heart, No gene data available");
			heart.addEventListener("click", function () {
				console.log(heart.getAttribute("id"));
			});
			bladder = document.getElementById('bladder');
			bladder.setAttributeNS(null, "data-tooltip-text", "Bladder, No gene data available");
			bladder.addEventListener("click", function () {
				console.log(bladder.getAttribute("id"));
			});
			largeIntestine = document.getElementById('largeIntestine');
			largeIntestine.setAttributeNS(null, "data-tooltip-text", "Large Intestine, No gene data available");
			largeIntestine.addEventListener("click", function () {
				console.log(largeIntestine.getAttribute("id"));
			});
			kidney = document.getElementById('kidney');
			//kidney.setAttributeNS(null, "data-tooltip-text", "Kidney, No gene data available");
			kidney.addEventListener("click", function () {
				console.log(kidney.getAttribute("id"));
			});
			spleen = document.getElementById('spleen');
			spleen.setAttributeNS(null, "data-tooltip-text", "Spleen, No gene data available");
			spleen.addEventListener("click", function () {
				console.log(spleen.getAttribute("id"));
			});
			human = document.getElementById('main');
			console.log( this.studyState.response.length-1);
			human.setAttributeNS(null, "data-tooltip-text", " # experiments:"+ (this.studyState.response.length-1).toString()+", 9 genes");
			for (var i = 0; i < pathTriggers.length; i++) {
				pathTriggers[i].addEventListener('mousemove', showToolTip);
				pathTriggers[i].addEventListener('mouseout', hideToolTip);
				//pathTriggers[i].addEventListener('mouseover', setHover);
			}
			if (this.genetissueArray != null) 
			{
				this.genetissueArray.map(genetissuepair => {
				//index = this.genetissueArray.findIndex((e) => e.tissue === genetissuepair.tissue);
			//if(index !== -1) 
			/*{
				console.log(datatooltip, index)
				datatooltip = this.genetissueArray[index];
			 } 
			 else 
			 {
				 datatooltip = 'No data available';
			}*/
			console.log(genetissuepair.tissue);
				switch (genetissuepair.tissue.toLowerCase()) {
					case "pancreas":
						 pancreas.setAttributeNS(null, "data-tooltip-text", " "+ genetissuepair.tissue+", # genes: "+ genetissuepair.genescount);
						 break;
					case "liver":
						 liver.setAttributeNS(null, "data-tooltip-text", " "+ genetissuepair.tissue+", # genes: "+ genetissuepair.genescount);
						 break;
					case "lung":
						 lung.setAttributeNS(null, "data-tooltip-text", " "+ genetissuepair.tissue+", # genes: "+ genetissuepair.genescount);
						 console.log(heart.getAttributeNS(null, "data-tooltip-text"));
						 break;

					case "abdomen":
						 abdomen.setAttributeNS(null, "data-tooltip-text", " "+ genetissuepair.tissue+", # genes: "+ genetissuepair.genescount);
						 console.log(heart.getAttributeNS(null, "data-tooltip-text"));
						break;

					case "kidney":
						 kidney.setAttributeNS(null, "data-tooltip-text", " "+ genetissuepair.tissue+", # genes: "+ genetissuepair.genescount);
						 console.log(heart.getAttributeNS(null, "data-tooltip-text"));
						 break;

					case "spleen":
						 spleen.setAttributeNS(null, "data-tooltip-text", " "+ genetissuepair.tissue+", # genes: "+ genetissuepair.genescount);
						 console.log(heart.getAttributeNS(null, "data-tooltip-text"));
						 break;

					case "small_intestine":
						 smallIntestine.setAttributeNS(null, "data-tooltip-text", " "+ genetissuepair.tissue+", # genes: "+ genetissuepair.genescount);
						 console.log(heart.getAttributeNS(null, "data-tooltip-text"));
						 break;

					case "large_intestine":
						 largeIntestine.setAttributeNS(null, "data-tooltip-text", " "+ genetissuepair.tissue+", # genes: "+ genetissuepair.genescount);
						 console.log(heart.getAttributeNS(null, "data-tooltip-text"));
						 break;

					case "bladder":
						 bladder.setAttributeNS(null, "data-tooltip-text", " "+ genetissuepair.tissue+", # genes: "+ genetissuepair.genescount);
						 console.log(heart.getAttributeNS(null, "data-tooltip-text"));
						 break;

					case "heart":
						 heart.setAttributeNS(null, "data-tooltip-text", " "+ genetissuepair.tissue+", # genes: "+ genetissuepair.genescount);
						 console.log(heart.getAttributeNS(null, "data-tooltip-text"));
						 break;
					default:
						break;
				}
			
			});
		}
		}
		return (
			<ReactComp />
		);
	}
}
export default connect(mapStateToProps)(HumanAnatomyCard);
