import React from "react";

function Header() {
	return (
		<nav>
			<span style={{ display: "inline-block" }}>
				<h2 className={"headingclass"}>Welcome HuBMAP Dataportal!</h2>
				<span className={"spanclass"}><a className={"aclass"} to="/studies" style={{ textDecoration: 'none', color: "white" }}>Studies</a></span>
				<span className={"spanclass"}><a className={"aclass"} to="/about" style={{ textDecoration: 'none', color: "white" }}> About</a></span>
				<span className={"spanclass"}><a className={"aclass"} to="/about" style={{ textDecoration: 'none', color: "white" }}> Home</a></span>
			</span>
		</nav>
	);
}

export default Header;
