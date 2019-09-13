import React from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { grey, blueGrey } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import BaseChildDropdown from './BaseChildDropdown';
import CssBaseline from '@material-ui/core/CssBaseline';
import ElevationScroll from './ElevationScroll';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  divroot: {
    flexGrow: 1,
    backgroundColor: grey[300],
    marginTop: '50px',
    display: 'flex',
    width:'900px'
  },
  paper: {
    //position: 'absolute',
    top: 36,
    right: 0,
    left: 0,
    backgroundColor: '#eeeeee',
    width: '100%',
    justifyContent: 'space-between',
  },
  formControl: {
    marginTop: 50,
  },
  gridList: {
    width: 'auto',
    height: 300,
  },
}));

export default class BaseDropdownPanel extends React.Component {
  container = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      menusections: {},
      menuname:'',
      open: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickAway = this.handleClickAway.bind(this);
  }

    handleClick = () => {
      this.setState((state) => ({ open: !state.open }));
    }

    handleClickAway = () => {
      this.setState({ open: false });
    }

    render() {
      const { open } = this.state;
      const { menusections,menuname } = this.props;
      const htmlElements = [];
      let i=0;
      for (const key in menusections) {
        console.log(menusections[key], key);
        htmlElements.push(                
        <GridListTile key={key} cols={i++}>
        <BaseChildDropdown
          menuitems={menusections[key]}
          menuname={key}
        />        
        </GridListTile>
        );
      }
      return (
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <div className={useStyles.root}>
            <Button onClick={this.handleClick}>{menuname}</Button>
            {open ? (
             // <Paper className={useStyles.paper}>

                <GridList cellHeight={"auto"} className={useStyles.gridList} cols={6}>
                {htmlElements}
                  <FormHelperText />
                    </GridList>
              //</Paper>
            ) : null}
          </div>
        </ClickAwayListener>
      );
    }
}

BaseDropdownPanel.propTypes = {
  menusections: PropTypes.array,
  menuname: PropTypes.string,
  open: PropTypes.bool,
};
BaseDropdownPanel.defaultProps = {
  menusections: {},
  menuname: '',
  open: false,
};
