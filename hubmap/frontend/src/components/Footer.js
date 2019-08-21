import React from "react";
import '../App.scss';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import GitVersion from '../GitVersion';

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: grey[300],
    color: grey[800],
  },
}));
function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <footer>
        <span style={{ display: 'inline-block' }}>
          <h5>
&#169; Human BioMolecular Atlas Program. Supported by the NIH Common Fund |
            {GitVersion}
          </h5>
        </span>
      </footer>
    </div>
  );
}

export default Footer;
