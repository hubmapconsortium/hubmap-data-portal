import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import grey from '@material-ui/core/colors/grey';
import * as Constants from '../../commons/constants';
import { store } from '../../index';
import { connect } from 'react-redux';
import { get_gene_tissue_colors, in_progress, searchThis } from "../../middleware/actions";
import * as Utils from '../../commons/utils'

const useStyles = makeStyles(theme => ({
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
        borderBlockColor: grey[800]
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

const mapStateToProps = state => {
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
/***
 * Remove animation from style in element's event handler
 */
function animationEnd(ev) {
    ev.target.style.animation = "";

};
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
        if (this.currentState !== "" && this.currentState.status !== Constants.IN_PROGRESS
            && this.currentState.response !== {} && this.currentState.type === Constants.GET_EXPERIMENTS) {
            this.props.dispatch(get_gene_tissue_colors(this.currentState));
        }
        else if (this.currentState.type === Constants.GET_GENE_TISSUE_COLOR_API && this.currentState.status === Constants.IN_PROGRESS) {
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
                    variant='outlined' fullWidth={true} onChange={(event, newValue) => {
                        event.persist(); // allow native event access (see: https://facebook.github.io/react/docs/events.html)
                        // give react a function to set the state asynchronously.
                        // here it's using the "name" value set on the TextField
                        // to set state.person.[firstname|lastname]. event.target.name
                        //required for showing animation
                        this.setState({ ...this.state, ['searchtext']: event.target.value });

                    }}
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                            // Do code here
                            //search for tissue+gene 
                            var searchState = {};
                            this.props.dispatch(searchThis(this.state.searchtext))
                                .then(() => {
                                    this.searchState = store.getState().searchState;

                                    //extract what we need for gene/tissue from search results
                                    var results = this.searchState.response !== undefined ?
                                        this.searchState.response : "";
                                    var tissues = results.reduce((arr, h) => {
                                        if (h.tissue !== undefined) {
                                            arr.push(h.tissue.name.toLowerCase());
                                        }
                                        return arr;
                                    }, []);
                                    console.log(tissues);
                                    let heatmap = results.reduce((arr, h) => {
                                        if (h.hugo_symbol !== undefined) {
                                            var colors = JSON.stringify(h.tissue_expression_heatmap);
                                            var res = colors.split(",");
                                            res.slice(1, res.length).map(h1 => {
                                                if (!h1.includes('"id:"')) {
                                                    arr.push(
                                                        h1.substr(1, h1.indexOf("_") - 1) +
                                                        ":" +
                                                        h1.substr(h1.indexOf(":") + 2, 7)
                                                    );
                                                }
                                                return arr;
                                            });
                                        }
                                        return arr;
                                    }, []);
                                    console.log(heatmap);
                                    for (var i = 0; i < heatmap.length; i++) {
                                        var tissueColorMap = heatmap[i].split(':');
                                        if (new Set(tissues).has(tissueColorMap[0])) {
                                            var tissue = document.getElementById(tissueColorMap[0]);
                                            Utils.addAnimationToStyle(tissueColorMap[0] + 'tissueAnimation',
                                                `0% {fill: ${tissueColorMap[1]}; opacity: 0;}
                                    100% {fill: ${tissueColorMap[1]}; opacity: 1;}`);
                                            tissue.style.removeProperty("animation");
                                            tissue.addEventListener("animationend", animationEnd);
                                            tissue.style.setProperty("animation", tissueColorMap[0] + 'tissueAnimation' + " 10s linear");
                                            tissue.style.setProperty("fill", `${tissueColorMap[1]}`);
                                            console.log(tissue);

                                        }
                                        else {
                                            var tissue1 = document.getElementById(tissueColorMap[0]);
                                            tissue1.style.setProperty("fill", `${tissueColorMap[1]}`);
                                            //tissue.style.setProperty("opacity", "0.2");
                                        }
                                        var imgelement = document.getElementById("tab10ColorMap");
                                        console.log(imgelement);
                                        imgelement.style.setProperty("display", "block")
                                    }
                                });
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
            </div>);
    }
}
export default connect(mapStateToProps)(SearchBox);