import React from 'react';
import Cookies from 'universal-cookie';
import {Component} from 'react';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
import grey from '@material-ui/core/colors/grey';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/core/styles';
import {NavLink, Link} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircleSharp from '@material-ui/icons/AccountCircleSharp';

const cookies = new Cookies();

const email = cookies.get('email');
const first_name = cookies.get('first_name');
const last_name = cookies.get('last_name');
const theme = createMuiTheme({
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Impact"',
        ].join(','),
    },
});

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 0.2,
    },
    root: {
        flexGrow: 1,
        backgroundColor: grey[300],
        color: grey[800],
    },
    menuButton: {
        marginRight: theme.spacing(2),
        backgroundColor: grey[300],
        color: grey[300],
    },
    title: {
        flexGrow: 2,
        fontSize: 12,
        fontVariant: "H3",
        fontFamily: "Impact",
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            backgroundColor: grey[300],
            color: grey[800],
        },
        backgroundColor: grey[300],
        color: grey[800],
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
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: grey[800],
    },
    inputRoot: {
        backgroundColor: grey[300],
        color: grey[800],
        borderColor: grey[800],
        width: 400,
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        //transition: theme.transitions.create('width'),
        width: '100%',
        marginLeft: 8,
        flex: 1,
        [theme.breakpoints.up('sm')]: {
            width: 400,
            '&:focus': {
                width: '100%',
            },
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            backgroundColor: grey[300],
            color: grey[800],
        },
        backgroundColor: grey[300],
        color: grey[800],
        marginLeft: -33,
        marginTop: -20,
    },

    sectionIconDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
        backgroundColor: grey[300],
        color: grey[800],
        marginLeft: 105,
    },
    sectionMenuDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
        backgroundColor: grey[300],
        color: grey[800],
        marginLeft: 40,
    },
    button: {
        marginTop: 36,
        marginLeft: 17,
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
}));

export default function LoggedInStatus()
{   
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isHelpMenuOpen = Boolean(anchorEl1);

    function handleMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleHelpMenuOpen(event) {
        setAnchorEl1(event.currentTarget);
    }

    function handleMenuClose() {
        setAnchorEl(null);
    }

    function handleHelpMenuClose() {
        setAnchorEl1(null);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleCloseHelp() {
        setAnchorEl1(null);
    }

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }
    function handleHelpClick(event) {
        setAnchorEl1(event.currentTarget);
    }

    if(email !== '')
    {
        return ( 
            <div className={classes.sectionMenuDesktop} >               
        <Button color={grey[300]} aria-controls="browse-menu" aria-haspopup="true" onClick={handleClick}>
        Logged in <AccountCircle className={classes.rightIcon} />
        </Button>
        <Menu
                            id="loggedin-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}>
                                 <MenuItem  > Globus email: {email}
                        <AccountCircleSharp className={classes.rightIcon} /></MenuItem>
                            <MenuItem onClick={handleClose} component={NavLink} to="/logout" >Logout from Globus
                        <AccountCircleSharp className={classes.rightIcon} /></MenuItem>
                       
                        </Menu>
            </div>
        )
    }
    else
    {
        return (<a href='http://localhost:8000/auth/login/globus/' target='__blank' style={{textDecoration:'none'}}>

        <Button color={grey[300]} aria-haspopup="true" >
        Login<AccountCircle className={classes.rightIcon} /></Button>
             </a>)
    }
}