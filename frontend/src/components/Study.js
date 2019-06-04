import '../App.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: grey[50],
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

function Study(props) {
    const classes = useStyles();
	const study = props.study;
	console.log(study)
		return (
            <div className="study">
                <GridListTile key={study.id}>
                    <GridListTileBar
                        title={study.id}
        subtitle={<div>
                    <span>{study.institution.name}</span>
                    <span>{study.tissue.name}</span>
                    <span>{study.data_type.name}</span></div>
                }
                        actionIcon={
                            <IconButton className={classes.icon}>
                            </IconButton>
                    }
                    key ={study['id']}
                    />
                </GridListTile>
			</div>
		);
}

export default Study;