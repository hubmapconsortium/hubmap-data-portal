import {ReactComponent as ReactComp} from "../images/Human_body_silhouette_minimal.svg";
import React from 'react';
import PureComponent from 'react';
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import grey from '@material-ui/core/colors/grey';
import { Container } from "@material-ui/core";
import data from './data';

const cellcount = data;
var humanSvg, tooltip, tooltipText, tooltipRects;

function showToolTip(evt){
	var CTM = humanSvg.getScreenCTM();
	var mousex = (evt.clientX -CTM.e +6)/CTM.a;
	var mousey = (evt.clientY - CTM.f +20)/CTM.d;
	tooltip.setAttributeNS(null, "x", mousex + 6 / CTM.a);
	tooltip.setAttributeNS(null, "y", mousey + 20 / CTM.d);
	tooltip.setAttributeNS(null, "transform", "translate(" + mousex + " " + mousey + ")");
	tooltip.setAttributeNS(null, "visibility", "visible");
	tooltipText.firstChild.data = evt.target.getAttributeNS(null, "data-tooltip-text");
	var length = tooltipText.getComputedTextLength();
				for (var i = 0; i < tooltipRects.length; i++) {
					tooltipRects[i].setAttributeNS(null, "width", length + 100);
					tooltipRects[i].setAttributeNS(null, "height", 150);
					tooltipRects[i].setAttributeNS(null, "font-size", 30);
				}
}

function hideToolTip(evt){
	tooltip.setAttributeNS(null, "visibility", "hidden");
}

class HumanAnatomyCard extends React.Component{
    constructor(props) {
        super(props);
		}


		
	 componentDidMount() {
		try {
			 /*const res = await fetch('http://127.0.0.1:8000/api/');
			 const studies = await res.json();
			  this.setState({
				studies
				});*/
				//first get svg 
				humanSvg = document.getElementById('human');
				tooltip = humanSvg.getElementById('tooltip');
				tooltipText = tooltip.getElementsByTagName('text')[0];
				tooltipRects = tooltip.getElementsByTagName('rect');
				var pathTriggers = humanSvg.getElementsByClassName('tooltip-trigger');
				for ( var i=0 ; i < pathTriggers.length; i++)
				{
					pathTriggers[i].addEventListener('mousemove', showToolTip);
					pathTriggers[i].addEventListener('mouseout', hideToolTip);
				}
				var pancreas =document.getElementById('path4681');
				pancreas.setAttributeNS(null,  "data-tooltip-text", " "+cellcount[3].tissue+": \n" +"# cells: "+cellcount[3].cells);
			  pancreas.addEventListener("click", async function() {
					console.log(pancreas.getAttribute("id"));
					console.log(cellcount);
					
			  });
        pancreas.addEventListener("mouseenter", function () {
								console.log("pancreas");
								console.log(this);
			  });
			  pancreas.addEventListener("mouseout", function () {
								
			  });
			  var stomach =document.getElementById('path4745');
			  stomach.addEventListener("click", async function() {
                  console.log(stomach.getAttribute("id"))
                  var chart = document.getElementById('studiesbyTissueschart');
                  // Create our table.
                    var barChart = document.getElementById('studiesbyTissueschart');
                    //barChart.draw(data, options);
                  console.log(chart);
				  //do something here get studies where tissue = brain
			  });
			  stomach.addEventListener("mouseenter", function() {
                
			  });
              stomach.addEventListener("mouseout", function () {
                
              });
              
			  var liver =document.getElementById('path5194');
              liver.addEventListener("click", function() {
			  	console.log(liver.getAttribute("id"));
					//do something here get studies where tissue = kidney
			  });
			  liver.addEventListener("mouseenter", function() {
			  });
			  liver.addEventListener("mouseout", function () {
			  });
		}
		catch (e) {
		  console.log(e);
		}
    }
    render(){
        return (
            <div className="svgclass">
                <ReactComp />
        </div>
        );
    }
}
export default HumanAnatomyCard;