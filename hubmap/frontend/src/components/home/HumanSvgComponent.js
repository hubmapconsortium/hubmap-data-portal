// TODO!
/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as ReactComp } from '../../images/Human_body_silhouette_minimal.svg';
import { get_colors, in_progress } from '../../middleware/actions';
import * as Constants from '../../commons/constants';
import * as utils from '../../commons/human-svg-utils';
import { store } from '../../index';

const mapStateToProps = (state) => ({
  status: state.colorsState.status,
  response: state.colorsState.response,
  error: state.colorsState.error,
});

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
	  if (response !== '' && response !== undefined
			&& type === Constants.GET_TISSUE_COLORS) {
	    this.previousState = this.currentState;
	    // first get svg
	    const humanSvg = document.getElementById('human');
	    const pathTriggers = humanSvg.getElementsByClassName('tooltip-trigger');
	    for (let i = 0; i < pathTriggers.length; i++) {
	      pathTriggers[i].addEventListener('mousemove', utils.showToolTip);
	      pathTriggers[i].addEventListener('mouseout', utils.hideToolTip);
		  pathTriggers[i].setAttributeNS(null, 'data-tooltip-text', ` ${pathTriggers[i].id},No gene data available`);
		  this.experimentState.response.slice(0, this.experimentState.response.length - 1).forEach((experiment) => {
			  if (pathTriggers[i].id.toLowerCase() === experiment.tissue.name.toLowerCase()) {
				 pathTriggers[i].setAttributeNS(null, 'data-tooltip-text', ` ${experiment.tissue.name},# genes: ${experiment.genes !== undefined ? experiment.genes.length : 0}`);
			  } else if (pathTriggers[i].id.toLowerCase() === 'main') {
				 pathTriggers[i].setAttributeNS(null, 'data-tooltip-text', ` # experiments:${(this.experimentState.response.length - 1).toString()}, 9 genes`);
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
