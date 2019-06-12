import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles(theme => ({
	footer: {
		position: "fixed",
		left: 0,
		bottom: 0,
		width: "100%",
		height: 40,
		backgroundColor: grey[100],
		color: grey[800],
	}
}));
function Footer() {
	const classes = useStyles();

	return (
		<div className={classes.footer}>
			<footer >
				<span style={{ display: "inline-block" }}>
					<h5>&#169; Human Bio Molecular Atlas Program</h5>
				</span>
			</footer>
		</div>
	)
}

export default Footer;