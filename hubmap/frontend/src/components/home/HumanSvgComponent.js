import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as HumanSvgReactComp } from '../../images/Human_body_silhouette_minimal.svg';
import { getColors, inProgress } from '../../middleware/actions';
import * as Constants from '../../commons/constants';
import * as utils from '../../commons/humanSvgUtils';
import store from '../../middleware/store';

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
      store.subscribe(() => {
        this.currentState = store.getState().colorsState;
        this.experimentState = store.getState().experimentState;
        this.geneTissueColorState = store.getState().geneTissueColorState;
      });
      if (this.currentState !== ''
      && this.currentState.status !== Constants.IN_PROGRESS
      && this.currentState.response !== ''
      && this.currentState.type === Constants.GET_TISSUE_COLORS) {
        getColors();
      } else {
        inProgress();
      }
    }

    render() {
      const { response, type } = store.getState().colorsState;
      this.currentState = store.getState().colorsState;
      this.experimentState = store.getState().experimentState;
      this.geneTissueColorState = store.getState().geneTissueColorState;
      if (response !== '' && response !== undefined
            && type === Constants.GET_TISSUE_COLORS) {
        this.previousState = this.currentState;
        // first get svg
        const humanSvg = document.getElementById('human');
        const pathTriggers = humanSvg.getElementsByClassName('tooltip-trigger');
        Array.from(pathTriggers).forEach((pathTrigger) => {
          pathTrigger.addEventListener('mousemove', utils.showToolTip);
          pathTrigger.addEventListener('mouseout', utils.hideToolTip);
          utils.setAttributes(pathTrigger, {
            'data-tooltip-text': `${pathTrigger.id}: No gene data available`,
          });
          // Last element of `response` is a summary: Use `slice` to exclude it.
          this.experimentState.response.slice(0, -1).forEach((experiment) => {
            if (pathTrigger.id === experiment.tissue.name) {
              utils.setAttributes(pathTrigger, {
                'data-tooltip-text': `${experiment.tissue.name},# genes: ${experiment.genes !== undefined ? experiment.genes.length : 0}`,
              });
            } else if (pathTrigger.id === 'Main') {
              utils.setAttributes(pathTrigger, {
                'data-tooltip-text': `# experiments:${this.experimentState.response.length - 1}, 9 genes`,
              });
            }
          });
        });
      }
      return (
        <HumanSvgReactComp />
      );
    }
}
export default connect(mapStateToProps)(HumanAnatomyCard);
