import React from "react";
import Study from "./Study";
import { PureComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';
import * as contentful from 'contentful';
import grey from '@material-ui/core/colors/grey';
import axios from 'axios';

const SPACE_ID = 'eo4e2dc0pbyt'
const ACCESS_TOKEN = 'H3bSZhVoA8_0_hjDzD6yGsq1jHCdBgxop3iJ9EM54B8'

const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
})

class Studies extends PureComponent {

    state = {
        studies: [],
        searchString: ''
    }

    constructor() {
        super()
        this.getStudies()
    }

    useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: grey[50],
            color: grey[800],
        },
        gridList: {
            width: 500,
            height: 450,
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
        studiesList:{ marginTop: -600},
    }));

    getStudies = () => {

        /*client.getEntries({
            content_type: 'study',
            query: this.state.searchString
        })
            .then((response) => {
                this.setState({ studies: response.items })
            })
            .catch((error) => {
                console.log("Error occured while fetching data")
                console.log(error)
            })*/
    }

    render() {
        console.log(this.state.studies);
        return (
            <div className={"studiesList"}>
                {this.state.studies ? (
                        <GridList cellHeight={100} className={this.useStyles.gridList}>
                            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                                <ListSubheader component="div">Studies from HuBMAP Consortium</ListSubheader>
                            </GridListTile>
                            {this.state.studies.map(study => (
                                <Study key={study['id']} study={study}>
                                </Study>
                            ))}
                        </GridList>
                    
                ) : "No studies found"}
            </div>
        );
    }
}
export default Studies;
   