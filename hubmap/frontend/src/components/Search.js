import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import grey from '@material-ui/core/colors/grey';
import data from './data';
import * as Constants from '../commons/constants';
import { store } from '../index';
import { connect } from 'react-redux';
import { fetch_gene_tissue_colors, in_progress, searchThis, search_studies } from "../middleware/actions";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    search: {
        width: 200,
        height: 40,
        border: '1px solid #fafafa',
        borderRadius: theme.shape.borderRadius,
        padding: 0,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
            border: '1px solid #424242',
        },

        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1.5),
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(2),
            marginTop: theme.spacing(4),
            width: '260px',
        },
    },
    inputRoot: {
        backgroundColor: grey[50],
        color: grey[800],
        borderColor: grey[800],
        width: 150,
    },
    inputInput: {
        transition: theme.transitions.create('width'),
        width: 150,
        marginLeft: 3,
        flex: 1,
        [theme.breakpoints.up('sm')]: {
            width: 150,
            '&:focus': {
                width: 150,
            },
            margin: 'dense',
        },
    },
}));

const mapStateToProps = state => {
    console.log(state.geneTissueColorState);
    return {
        status: state.geneTissueColorState.status,
        response: state.geneTissueColorState.response,
		error: state.geneTissueColorState.error,
		count: state.geneTissueColorState.count,
		page: state.geneTissueColorState.page,
		next: state.geneTissueColorState.next,
		previous: state.geneTissueColorState.previous,
    }
};

class SearchBox extends React.Component{
    currentState = {};
    previousState ={};
    constructor(props)
    {
        super(props);
		this.state = {
			searchtext: 'gene',
            path: 'path',
		};
    }

    componentDidMount(){
        store.subscribe(() => this.currentState = store.getState().geneTissueColorState);
        if (this.currentState !== "" && this.currentState.status !== Constants.IN_PROGRESS
        && this.currentState.studies !== {} && this.currentState.type === Constants.GLOBAL_FETCH_ACTION) {
			console.log(this.currentState);
            this.props.dispatch(fetch_gene_tissue_colors(this.currentState));
        }
        else if(this.currentState.type === Constants.GET_GENE_TISSUE_COLOR_API && this.currentState.status === Constants.IN_PROGRESS)
        {
            this.props.dispatch(in_progress());
        }
    }

        render() {
        return (
            <div className={useStyles.search}>
                <InputBase
                    placeholder="Genes: NPPB, SFTPA1"
                    classes={{
                        root: useStyles.inputRoot,
                        input: useStyles.inputInput,
                    }}
                    inputProps={{
                        'aria-label': 'Search',
                    }}
                    variant="outlined" fullWidth={true} onChange={(event, newValue) => {
                        event.persist(); // allow native event access (see: https://facebook.github.io/react/docs/events.html)
                        // give react a function to set the state asynchronously.
                        // here it's using the "name" value set on the TextField
                        // to set state.person.[firstname|lastname]. event.target.name
                        //required for showing animation
                        this.setState({ ...this.state, ['searchtext']: event.target.value });
                        console.log(newValue, store.getState());
                     
                        console.log(event.target.value, this.currentState);
                    }}
                    onKeyPress={(ev) => {
                        console.log(`Pressed keyCode ${ev.key}`);
                        if (ev.key === 'Enter') {
                            // Do code here
                               //search for tissue+gene 
                               var searchState = {};
                        this.props.dispatch(searchThis(this.state.searchtext))
                        .then(() => {this.searchState = store.getState().searchState;
                            console.log(this.searchState);
                            for (var i = 0; i < data.length; i++) {
                                if (this.state.searchtext === data[i].gene) {
                                    var tissue = document.getElementById(data[i].path);
                                    console.log(data[i].path);
                                    //required for showing animation
                                    this.setState({ ...this.state, ['path']: data[i].path });
                                    tissue.style.setProperty("animation", "pulse 10s linear");
                                    tissue.setAttribute("opacity", "0.4");
                                }
                            }
                        });
                        console.log(store.getState().searchState, this.searchState);
                            console.log(this.state.searchtext);
                            console.log(this.currentState);
                            ev.preventDefault();
                        }
                    }}
                    onAnimationStart={(ev) => {
                        console.log(`Pressed keyCode ${ev.key}`);
                        if (ev.key === 'Enter') {
                            // Do code here
                            console.log(this.state.searchtext);

                            ev.preventDefault();
                        }
                    }} />
            </div>);
         }
}
export default connect(mapStateToProps)(SearchBox);
