import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {globusSignin} from '../middleware/actions';
import GlobusIcon from '../images/globus_logo_small.png'
import grey from '@material-ui/core/colors/grey';
import {NavLink} from 'react-router-dom';

function redirect()
{
  globusSignin();
}

function HuBMAP() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Click on Globus signin to login.'}
      <Link color="inherit" href="https://hubmapconsortium.org/">
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: grey[200],
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    height:160,
    width:160,
    backgroundColor: "inherit"
  },
}));

function GlobusSignIn() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" style={{marginTop:120}}>
      <CssBaseline />
      
      {/* < a href='http://localhost:8000/auth/login/globus/' target='_blank'>
      <Button color={"inherit"} backgroundColor={grey[300]} width={300} height={300} >
        <img src={GlobusIcon} alt='icon' />
        </Button>
        </a>
        
       <Box mt={5}>
        <HuBMAP />
      </Box> */}
    </Container>
  );
}

export default GlobusSignIn;