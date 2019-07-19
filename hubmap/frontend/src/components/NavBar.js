import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import grey from '@material-ui/core/colors/grey';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
import HubmapLogo from "../images/HuBMAP-Retina-Logo-Color.png";
import posed from 'react-pose';
import { Button } from '@material-ui/core';
import NavigationIcon from '@material-ui/icons/NavigateNext';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import LibraryIcon from '@material-ui/icons/LibraryBooks';
import ExploreIcon from '@material-ui/icons/ExploreOutlined';
import GraphIcon from '@material-ui/icons/BubbleChart';
import FlowIcon from '@material-ui/icons/TableChart';
import HelpIcon from '@material-ui/icons/Help';
import {NavLink, HashRouter} from 'react-router-dom';

import MicroscopeIcon from '../icons/MicroscopeIcon';

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
        color: grey[800],
    },
    title: {
        flexGrow: 2,
        fontSize: 20,
        fontVariant: "H2",
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
        border: '1px solid #fafafa',
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
        width: 300,
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

function SearchAppBar(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isHelpMenuOpen = Boolean(anchorEl1);
    const Img = posed.img({
        pressable: true,
        init: { scale: 1 },
        press: { scale: 0.8 }
    });
    const img = <img style={{
        marginTop: 10, flex: 1,
        width: 150,
        resizeMode: 'contain',
    }} src={HubmapLogo} alt="Logo" />;

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

    return (
        <div className={classes.root}>
            <AppBar justifyContent="flex-start" position="fixed" style={{ backgroundColor: grey[300] }} height={30} width={'100%'}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Open drawer">
                        {img}
                    </IconButton>
                    <div className={classes.sectionDesktop}>
                        <Button className={classes.button}>
                            <MuiThemeProvider theme={theme}  >
                                <Typography className={classes.title} noWrap >
                                <NavLink to="/">DataPortal</NavLink>
                    </Typography>
                            </MuiThemeProvider >
                            <NavigationIcon />
                        </Button>
                    </div>
                    <div className={classes.grow} />

                    <div className={classes.sectionIconDesktop} >

                        <Button aria-controls="browse-menu" aria-haspopup="true" onClick={handleClick} >
                            Browse
                        <GraphIcon className={classes.rightIcon} />
                        </Button>
                        <Menu
                            id="browse-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}>
                            <MenuItem onClick={handleClose}><NavLink to="/dataanalysis"> Data Analysis
                        <GraphIcon className={classes.rightIcon} /></NavLink></MenuItem>
                            <MenuItem onClick={handleClose}><NavLink to="/experiments">Experiments
                        <LibraryIcon className={classes.rightIcon} /></NavLink></MenuItem>
                            <MenuItem onClick={handleClose}><NavLink to="/pipelines">Pipelines
                        <FlowIcon className={classes.rightIcon} /></NavLink></MenuItem>
                        </Menu>



                        <Button aria-controls="help-menu" aria-haspopup="true" onClick={handleHelpClick} >
                            Help
                        <HelpIcon className={classes.rightIcon} />
                        </Button>
                        <Menu
                            id="help-menu"
                            anchorEl={anchorEl1}
                            keepMounted
                            open={Boolean(anchorEl1)}
                            onClose={handleCloseHelp}>
                            <MenuItem onClick={handleCloseHelp}>Rna seq Pipeline
                        <ExploreIcon className={classes.rightIcon} /></MenuItem>
                            <MenuItem onClick={handleCloseHelp}>ATAC-seq Pipeline
                        <ExploreIcon className={classes.rightIcon} /></MenuItem>
                            <MenuItem onClick={handleCloseHelp}>CDNA-seq Pipeline
                        <ExploreIcon className={classes.rightIcon} /></MenuItem>
                            <MenuItem onClick={handleCloseHelp}>Spatial Transcriptomic Pipeline
                        <ExploreIcon className={classes.rightIcon} /></MenuItem>
                            <MenuItem onClick={handleCloseHelp}>Microscopy Pipeline
                        <MicroscopeIcon className={classes.rightIcon} /></MenuItem>
                            <MenuItem onClick={handleCloseHelp}>Seq Fish Imaging Pipeline
                        <MicroscopeIcon className={classes.rightIcon} /></MenuItem>
                            <MenuItem onClick={handleCloseHelp}>Mass Cytometry Pipeline
                        <MicroscopeIcon className={classes.rightIcon} /></MenuItem>
                            <MenuItem onClick={handleCloseHelp}>Data Download
                        <CloudDownloadIcon className={classes.rightIcon} /></MenuItem>
                            <MenuItem onClick={handleCloseHelp}><NavLink to="/userfaqs">User FAQs
                            </NavLink></MenuItem>

                        </Menu>

                        <Button color="inherit" aria-haspopup="true" >Login <AccountCircle className={classes.rightIcon} /></Button>
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.grow} />
                    <div className={classes.grow} />
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{
                                'aria-label': 'Search',
                            }}
                            variant="outlined"
                        />
                    </div>
                </Toolbar>
            </AppBar>

        </div>
    );
}
export default SearchAppBar;