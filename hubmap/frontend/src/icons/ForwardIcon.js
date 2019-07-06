import React from "react";
import PropTypes from 'prop-types';
import fade from '@material-ui/core/styles/colorManipulator';
import  makeStyles from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import SvgIcon from '@material-ui/core/SvgIcon';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 0,
    marginLeft: -10,
  },
  icon: {
    margin: theme.spacing(0.8),
    color: fade(grey[800], 0.6),
    width: 20,
    height:20,
  },
  iconHover: {
    margin: theme.spacing(1.5),
    '&:hover': {
      color: grey[800],
    },
  },
});

function ForwardIcon(props) {
  return (
    <SvgIcon {...props}>
<path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/><path fill="none" d="M0 0h24v24H0z"/> 
 </SvgIcon>
  );
}

function SvgIcons(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ForwardIcon className={classes.icon} />
    </div>
  );
}
SvgIcons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SvgIcons);