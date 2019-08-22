import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import grey from '@material-ui/core/colors/grey';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import posed from 'react-pose';
import { Button } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import LibraryIcon from '@material-ui/icons/LibraryBooks';
import ExploreIcon from '@material-ui/icons/ExploreOutlined';
import GraphIcon from '@material-ui/icons/BubbleChart';
import FlowIcon from '@material-ui/icons/TableChart';
import HelpIcon from '@material-ui/icons/Help';
import { NavLink } from 'react-router-dom';
import HubmapLogo from '../images/HuBMAP-Retina-Logo-Color.png';

import MicroscopeIcon from '../icons/MicroscopeIcon';
import LogInStatus from './home/LogInStatus';


const useStyles = makeStyles((theme) => ({
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
    fontVariant: 'H3',
    fontFamily: 'Impact',
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
    borderBlockColor: grey[800],
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
    // transition: theme.transitions.create('width'),
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


function SearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  posed.img({
    pressable: true,
    init: { scale: 1 },
    press: { scale: 0.8 },
  });
  const img = (
    <img
      style={{
        marginTop: 10,
        flex: 1,
        width: 200,
        resizeMode: 'contain',
      }}
      src={HubmapLogo}
      alt="Logo"
    />
  );

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
      <AppBar justifyContent="flex-start" position="fixed" style={{ backgroundColor: grey[300] }} height={30} width="100%">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
            href="/"
          >
            {img}

          </IconButton>
          <div className={classes.grow} />

          <div className={classes.sectionMenuDesktop}>

            <Button aria-controls="browse-menu" aria-haspopup="true" onClick={handleClick}>
                            Browse
              <GraphIcon className={classes.rightIcon} />
            </Button>
            <Menu
              id="browse-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={NavLink} to="/dataanalysis">
                {' '}
Data Analysis
                <GraphIcon className={classes.rightIcon} />
              </MenuItem>
              <MenuItem onClick={handleClose} component={NavLink} to="/experiments">
Experiments
                <LibraryIcon className={classes.rightIcon} />
              </MenuItem>
              <MenuItem onClick={handleClose} component={NavLink} to="/pipelines">
Pipelines
                <FlowIcon className={classes.rightIcon} />
              </MenuItem>
            </Menu>

          </div>
          <div className={classes.sectionMenuDesktop}>
            <Button aria-controls="help-menu" aria-haspopup="true" onClick={handleHelpClick} color={grey[300]}>
                            Help
              <HelpIcon className={classes.rightIcon} />
            </Button>
            <Menu
              id="help-menu"
              anchorEl={anchorEl1}
              keepMounted
              open={Boolean(anchorEl1)}
              onClose={handleCloseHelp}
            >
              <MenuItem onClick={handleCloseHelp} component={NavLink} to="/rnaseq">
Rna seq Pipeline
                <ExploreIcon className={classes.rightIcon} />
              </MenuItem>
              <MenuItem onClick={handleCloseHelp} component={NavLink} to="/atacseq">
ATAC-seq Pipeline
                <ExploreIcon className={classes.rightIcon} />
              </MenuItem>
              <MenuItem onClick={handleCloseHelp} component={NavLink} to="/cdnaseq">
CDNA-seq Pipeline
                <ExploreIcon className={classes.rightIcon} />
              </MenuItem>
              <MenuItem onClick={handleCloseHelp} component={NavLink} to="/spatialtranscriptomic">
Spatial Transcriptomic Pipeline
                <ExploreIcon className={classes.rightIcon} />
              </MenuItem>
              <MenuItem onClick={handleCloseHelp} component={NavLink} to="/microscopy">
Microscopy Pipeline
                <MicroscopeIcon className={classes.rightIcon} />
              </MenuItem>
              <MenuItem onClick={handleCloseHelp} component={NavLink} to="/seqfishimaging">
Seq Fish Imaging Pipeline
                <MicroscopeIcon className={classes.rightIcon} />
              </MenuItem>
              <MenuItem onClick={handleCloseHelp} component={NavLink} to="/masscytometry">
Mass Cytometry Pipeline
                <MicroscopeIcon className={classes.rightIcon} />
              </MenuItem>
              <MenuItem onClick={handleCloseHelp} component={NavLink} to="/download">
Data Download
                <CloudDownloadIcon className={classes.rightIcon} />
              </MenuItem>
              <MenuItem onClick={handleCloseHelp} component={NavLink} to="/userfaqs">
User FAQs
              </MenuItem>

            </Menu>
          </div>
          <div className={classes.sectionMenuDesktop}>
            <LogInStatus />
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
