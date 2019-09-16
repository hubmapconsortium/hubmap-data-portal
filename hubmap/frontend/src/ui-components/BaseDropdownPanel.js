import React from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { grey } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import BaseChildDropdown from './BaseChildDropdown';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width:'1500px'
  },
  divroot: {
    flexGrow: 1,
    backgroundColor: grey[300],
    marginTop: '50px',
    display: 'flex',
    width:'1200px'
  },
  paper: {
    //position: 'absolute',
    top: 36,
    right: 0,
    left: 0,
    backgroundColor: '#eeeeee',
    width: '1200px',
    justifyContent: 'space-between',
  },
  formControl: {
    marginTop: 50,
  },
  gridList: {
    width: '100%',
    height: 300,
    margin: 0,
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
        <GridListTile key={key} cols={3}>
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
              <Paper className={useStyles.paper}>

                <GridList cellHeight="auto" className={useStyles.gridList} cols={12}>
                  {htmlElements}
                  <FormHelperText />
                </GridList>
              </Paper>
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
