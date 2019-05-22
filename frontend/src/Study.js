import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import {ReactComponent as ReactComp} from "./images/Human_body_silhouette.svg";

function Study(props) {
	const study = props.study;
	console.log(study)
		return (
			<div className="study">
				<div key ={study['id']}>
					<h1>{study.id}</h1>
					<span>{study.institution.name}</span>,
					<span>{study.tissue.name}</span>,
					<span>{study.data_type.name}</span>
				</div>
			</div>
		);
}

export default Study;