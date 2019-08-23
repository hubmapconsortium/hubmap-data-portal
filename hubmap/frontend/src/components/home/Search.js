// TODO!
/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-concat */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prop-types */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import grey from '@material-ui/core/colors/grey';
import { connect } from 'react-redux';
import * as Constants from '../../commons/constants';
import { store } from '../../index';
import { get_gene_tissue_colors, in_progress, searchThis } from '../../middleware/actions';
import * as Utils from '../../commons/animation-utils';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    border: '1px solid #424242',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
      border: '1px solid #424242',
    },
    marginRight: theme.spacing(1.5),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    borderBlockColor: grey[800],
  },
  inputRoot: {
    backgroundColor: grey[300],
    color: grey[800],
    borderColor: grey[800],
    width: 150,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    marginLeft: 8,
    flex: 1,
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: '100%',
      },
    },
  },
  searchIcon: {
    width: theme.spacing(5),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: grey[800],
  },
}));

const mapStateToProps = (state) => ({
  status: state.geneTissueColorState.status,
  response: state.geneTissueColorState.response,
  error: state.geneTissueColorState.error,
  count: state.geneTissueColorState.count,
  page: state.geneTissueColorState.page,
  next: state.geneTissueColorState.next,
  previous: state.geneTissueColorState.previous,
});
/** *
 * Remove animation from style in element's event handler
 */
function animationEnd(ev) {
  ev.target.style.animation = '';
}
class SearchBox extends React.Component {
    currentState = {};

    previousState = {};

    constructor(props) {
      super(props);
      this.state = {
        searchtext: 'gene',
        path: 'path',
      };
    }

    componentDidMount() {
      store.subscribe(() => this.currentState = store.getState().geneTissueColorState);
      if (this.currentState !== '' && this.currentState.status !== Constants.IN_PROGRESS
            && this.currentState.response !== {} && this.currentState.type === Constants.GET_EXPERIMENTS) {
        this.props.dispatch(get_gene_tissue_colors(this.currentState));
      } else if (this.currentState.type === Constants.GET_GENE_TISSUE_COLOR_API && this.currentState.status === Constants.IN_PROGRESS) {
        this.props.dispatch(in_progress());
      }
    }

    render() {
      return (
        <div className={useStyles.search}>
          <InputBase
            placeholder="e.g. CD5L, OR5AK2.."
            classes={{
              root: useStyles.inputRoot,
              input: useStyles.inputInput,
            }}
            inputProps={{
              'aria-label': 'Search',
            }}
            variant="outlined"
            fullWidth
            onChange={(event, newValue) => {
              event.persist(); // allow native event access (see: https://facebook.github.io/react/docs/events.html)
              // give react a function to set the state asynchronously.
              // here it's using the "name" value set on the TextField
              // to set state.person.[firstname|lastname]. event.target.name
              // required for showing animation
              this.setState({ ...this.state, searchtext: event.target.value });
            }}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                // Do code here
                // search for tissue+gene
                this.props.dispatch(searchThis(this.state.searchtext))
                  .then(() => {
                    this.searchState = store.getState().searchState;

                    // extract what we need for gene/tissue from search results
                    const results = this.searchState.response !== undefined
                      ? this.searchState.response : '';
                    const tissues = results.reduce((arr, h) => {
                      if (h.tissue !== undefined) {
                        arr.push(h.tissue.name.toLowerCase());
                      }
                      return arr;
                    }, []);
                    const heatmap = results.reduce((arr, h) => {
                      if (h.hugo_symbol !== undefined) {
                        arr = Object.entries(h.tissue_expression_heatmap);
                      }
                      return arr;
                    }, []);
                    heatmap.forEach((entry) => {
                      tissues.forEach((tissue) => {
                        if (entry[0].includes(tissue)) {
                          const tissueElement = document.getElementById(tissue);
                          const animationName = `${tissue}tissueAnimation`;
                          Utils.addAnimationToStyle(animationName,
                            `0% {fill: ${entry[1]}; opacity: 0;}
                                                    100% {fill: ${entry[1]}; opacity: 1;}`);
                          tissueElement.style.removeProperty('animation');
                          tissueElement.addEventListener('animationend', animationEnd);
                          tissueElement.style.setProperty('animation', `${tissue}tissueAnimation 10s linear`);
                          tissueElement.style.setProperty('fill', `${entry[1]}`);
                          console.log(tissueElement);
                        } else {
                          const tissue1 = document.getElementById(tissue);
                          tissue1.style.setProperty('fill', `${entry[1]}`);
                        }
                      });
                    });
                    const imgelement = document.getElementById('tab10ColorMap');
                    console.log(imgelement);
                    imgelement.style.setProperty('display', 'block');
                  }, []);
                ev.preventDefault();
              }
            }}
            onAnimationStart={(ev) => {
              if (ev.key === 'Enter') {
                // Do code here
                ev.preventDefault();
              }
            }}
            onAnimationEnd={(ev) => {
              if (ev.key === 'Enter') {
                // Do code here

                ev.preventDefault();
              }
            }}
          />
        </div>
      );
    }
}
export default connect(mapStateToProps)(SearchBox);
