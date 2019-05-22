import React from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import './App.css';

function Footer() {
	return (
		<footer>
			<span  style={{display:"inline-block"}}>
			<h5>&#169; HuBMAP</h5>
			</span>
		</footer>
	)
}

export default Footer;