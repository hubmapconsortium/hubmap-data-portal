import React from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

function Header() {
	return (

		 <nav>
				<span style={{display:"inline-block"}}>
					<h1 className={"headingclass"}>Welcome HuBMAP Dataportal!</h1>
					<span className={"spanclass"}><a className={"aclass"} to="/studies" style={{ textDecoration: 'none', color:"white"}}>Studies</a></span>
					<span className={"spanclass"}><a className={"aclass"} to="/about" style={{ textDecoration: 'none', color:"white"}}> About</a></span>
					<span className={"spanclass"}><a className={"aclass"} to="/about" style={{ textDecoration: 'none', color:"white"}}> Home</a></span>
				</span>
			</nav>

	);
}

export default Header;
