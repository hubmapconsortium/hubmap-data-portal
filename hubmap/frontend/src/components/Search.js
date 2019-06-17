import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import grey from '@material-ui/core/colors/grey';
import data from './data';

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

function SearchBox(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        searchtext: 'gene',
        path: 'path',
    });
    return (
        <div className={classes.search}>
            <InputBase
                placeholder="Search Gene..eg: NPPB"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
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
                    setValues({ ...values, ['searchtext']: event.target.value });
                    //console.log(newValue);
                    //console.log(event.target.value);
                }}
                onKeyPress={(ev) => {
                    console.log(`Pressed keyCode ${ev.key}`);
                    if (ev.key === 'Enter') {
                        // Do code here
                        console.log(values.searchtext);
                        for (var i = 0; i < data.length; i++) {
                            if (values.searchtext === data[i].gene) {
                                var tissue = document.getElementById(data[i].path);
                                //required for showing animation
                                setValues({ ...values, ['path']: data[i].path });
                                tissue.style.setProperty("animation", "pulse 10s linear");
                                tissue.setAttribute("opacity", "0.4");
                            }
                        };

                        ev.preventDefault();
                    }
                }}
                onAnimationStart={(ev) => {
                    console.log(`Pressed keyCode ${ev.key}`);
                    if (ev.key === 'Enter') {
                        // Do code here
                        console.log(values.searchtext);

                        ev.preventDefault();
                    }
                }} />
        </div>
    )
}
export default SearchBox;
