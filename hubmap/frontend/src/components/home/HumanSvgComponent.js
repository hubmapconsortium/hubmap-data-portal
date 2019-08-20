import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as ReactComp } from '../../images/Human_body_silhouette_minimal.svg';
import { get_colors, in_progress } from '../../middleware/actions';
import * as Constants from '../../commons/constants';
import { store } from '../../index';

const mapStateToProps = (state) => ({
  status: state.colorsState.status,
  response: state.colorsState.response,
  error: state.colorsState.error,
});

let pancreas; let heart; let lung; let smallIntestine; let largeIntestine;
let abdomen; let liver; let bladder; let kidney; let spleen; let
  human;

// var genetissueArray = {};
let humanSvg; let tooltip; let tooltipText; let
  tooltipRects;
function updateText(tspanId, txt) {
  const spanEl = document.getElementById(tspanId);
  while (spanEl.firstChild) {
    spanEl.removeChild(spanEl.firstChild);
  }
  spanEl.appendChild(document.createTextNode(txt));
}

function showToolTip(evt) {
  const CTM = humanSvg.getScreenCTM();
  const mousex = (evt.clientX - CTM.e + 6) / CTM.a;
  const mousey = (evt.clientY - CTM.f + 20) / CTM.d;
  tooltip.setAttributeNS(null, 'transform', `translate(${mousex} ${mousey})`);
  tooltip.setAttributeNS(null, 'visibility', 'visible');
  const lines = evt.target.getAttributeNS(null, 'data-tooltip-text').split(',');
  tooltipText.firstChild.data = lines[0];
  updateText('tspanid', lines[1]);
  // updateText("tspanid2", lines[2]);
  const length = tooltipText.getComputedTextLength();

  for (let i = 0; i < tooltipRects.length; i++) {
    tooltipRects[i].setAttributeNS(null, 'width', length + 10);
    tooltipRects[i].setAttributeNS(null, 'height', 30);
    tooltipRects[i].setAttributeNS(null, 'font-size', 2);
  }
  this.setAttribute('opacity', 0.6);
}

function hideToolTip(evt) {
  tooltip.setAttributeNS(null, 'visibility', 'hidden');
  this.setAttribute('opacity', 1);
}
// console.log(ev);
// tissue.style.removeProperty("animation");
class HumanAnatomyCard extends React.Component {
	currentState = {};

	previousState = {};

	experimentState = {};

	geneTissueColorState = {};

	componentDidMount() {
	  try {
	    store.subscribe(() => {
	      this.currentState = store.getState().colorsState;
	      this.experimentState = store.getState().experimentState;
	      this.geneTissueColorState = store.getState().geneTissueColorState;
	    });
	    if (this.currentState !== '' && this.currentState.status !== Constants.IN_PROGRESS && this.currentState.response !== ''
				&& this.currentState.type === Constants.GET_TISSUE_COLORS) {
	      this.props.dispatch(get_colors());
	    } else {
	      this.props.dispatch(in_progress());
	    }
	  } catch (e) {
	    console.log(e);
	  }
	}

	render() {
	  const { response, error, type } = store.getState().colorsState;
	  this.currentState = store.getState().colorsState;
	  this.experimentState = store.getState().experimentState;
	  this.geneTissueColorState = store.getState().geneTissueColorState;
	  if (this.experimentState !== undefined && this.experimentState.response !== undefined
			&& this.experimentState.status !== Constants.FAILURE && this.experimentState.status !== '') {
	    this.genetissueArray = this.experimentState.response.slice(0, this.experimentState.response.length - 1)
	      .reduce((arr, study) => {
	        const index = arr.findIndex((e) => e.tissue === study.tissue.name);
	        if (index === -1) {
	          arr.push(
	            {
	              tissue: study.tissue.name,
	              genescount: study.genes !== undefined ? study.genes.length : 0,
	            },
	          );
	        } else {
	          arr[index] = { tissue: study.tissue.name, genescount: study.genes !== undefined ? study.genes.length : 0 };
	        }
	        return arr;
	      },
					 []);
	  }
	  if (response !== '' && response !== undefined
			&& type === Constants.GET_TISSUE_COLORS) {
	    this.previousState = this.currentState;
	    // first get svg
	    humanSvg = document.getElementById('human');
	    tooltip = humanSvg.getElementById('tooltip');
	    tooltipText = tooltip.getElementsByTagName('text')[0];
	    tooltipRects = tooltip.getElementsByTagName('rect');
	    const pathTriggers = humanSvg.getElementsByClassName('tooltip-trigger');

	    pancreas = document.getElementById('pancreas');
	    pancreas.setAttributeNS(null, 'data-tooltip-text', 'Pancreas, No gene data available');
	    pancreas.addEventListener('click', async () => {
	    });

	    abdomen = document.getElementById('abdomen');
	    abdomen.setAttributeNS(null, 'data-tooltip-text', 'Abdomen, No gene data available');
	    abdomen.addEventListener('click', async () => {
	    });

	    liver = document.getElementById('liver');
	    liver.setAttributeNS(null, 'data-tooltip-text', 'Liver, No gene data available');
	    liver.addEventListener('click', () => {
	    });

	    lung = document.getElementById('lung');
	    lung.setAttributeNS(null, 'data-tooltip-text', 'Lung, No gene data available');
	    lung.addEventListener('click', () => {
	    });
	    smallIntestine = document.getElementById('smallIntestine');
	    smallIntestine.setAttributeNS(null, 'data-tooltip-text', 'Small Intestine, No gene data available');
	    smallIntestine.addEventListener('click', () => {
	    });
	    heart = document.getElementById('heart');
	    heart.setAttributeNS(null, 'data-tooltip-text', 'Heart, No gene data available');
	    heart.addEventListener('click', () => {
	    });
	    bladder = document.getElementById('bladder');
	    bladder.setAttributeNS(null, 'data-tooltip-text', 'Bladder, No gene data available');
	    bladder.addEventListener('click', () => {
	    });
	    largeIntestine = document.getElementById('largeIntestine');
	    largeIntestine.setAttributeNS(null, 'data-tooltip-text', 'Large Intestine, No gene data available');
	    largeIntestine.addEventListener('click', () => {
	    });
	    console.log(largeIntestine.getAttribute('data-tooltip-text'));
	    kidney = document.getElementById('kidney');
	    kidney.setAttributeNS(null, 'data-tooltip-text', 'Kidney, No gene data available');
	    kidney.addEventListener('click', () => {
	    });
	    spleen = document.getElementById('spleen');
	    spleen.setAttributeNS(null, 'data-tooltip-text', 'Spleen, No gene data available');
	    spleen.addEventListener('click', () => {
	    });
	    human = document.getElementById('main');
	    human.setAttributeNS(null, 'data-tooltip-text', ` # experiments:${(this.experimentState.response.length - 1).toString()}, 9 genes`);
	    for (let i = 0; i < pathTriggers.length; i++) {
	      pathTriggers[i].addEventListener('mousemove', showToolTip);
	      pathTriggers[i].addEventListener('mouseout', hideToolTip);
	      // pathTriggers[i].addEventListener('mouseover', setHover);
	    }
	    if (this.genetissueArray != null) {
	      this.genetissueArray.forEach((genetissuepair) => {
	        // index = this.genetissueArray.findIndex((e) => e.tissue === genetissuepair.tissue);
	        // if(index !== -1)
	        /* {
						console.log(datatooltip, index)
						datatooltip = this.genetissueArray[index];
					 }
					 else
					 {
						 datatooltip = 'No data available';
					} */
	        switch (genetissuepair.tissue.toLowerCase()) {
	          case 'pancreas':
	            pancreas.setAttributeNS(null, 'data-tooltip-text', ` ${genetissuepair.tissue}, # genes: ${genetissuepair.genescount}`);
	            break;
	          case 'liver':
	            liver.setAttributeNS(null, 'data-tooltip-text', ` ${genetissuepair.tissue}, # genes: ${genetissuepair.genescount}`);
	            break;
	          case 'lung':
	            lung.setAttributeNS(null, 'data-tooltip-text', ` ${genetissuepair.tissue}, # genes: ${genetissuepair.genescount}`);
	            break;

	          case 'abdomen':
	            abdomen.setAttributeNS(null, 'data-tooltip-text', ` ${genetissuepair.tissue}, # genes: ${genetissuepair.genescount}`);
	            break;

	          case 'kidney':
	            kidney.setAttributeNS(null, 'data-tooltip-text', ` ${genetissuepair.tissue}, # genes: ${genetissuepair.genescount}`);
	            break;

	          case 'spleen':
	            spleen.setAttributeNS(null, 'data-tooltip-text', ` ${genetissuepair.tissue}, # genes: ${genetissuepair.genescount}`);
	            break;

	          case 'small_intestine':
	            smallIntestine.setAttributeNS(null, 'data-tooltip-text', ` ${genetissuepair.tissue}, # genes: ${genetissuepair.genescount}`);
	            break;

	          case 'large_intestine':
	            largeIntestine.setAttributeNS(null, 'data-tooltip-text', ` ${genetissuepair.tissue}, # genes: ${genetissuepair.genescount}`);
	            break;

	          case 'bladder':
	            bladder.setAttributeNS(null, 'data-tooltip-text', ` ${genetissuepair.tissue}, # genes: ${genetissuepair.genescount}`);
	            break;

	          case 'heart':
	            heart.setAttributeNS(null, 'data-tooltip-text', ` ${genetissuepair.tissue}, # genes: ${genetissuepair.genescount}`);
	            break;
	          default:
	            break;
	        }
	      });
	    }
	  } else if (error !== undefined && error !== '') {
	    console.log(error);
	  }
	  return (
  <ReactComp />
	  );
	}
}
export default connect(mapStateToProps)(HumanAnatomyCard);
