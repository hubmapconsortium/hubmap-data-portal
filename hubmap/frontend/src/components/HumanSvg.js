import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import HumanAnatomyCard from "./Anatomy";
import SearchBox from "./Search";


function MainContent(props) {
    const studies = props.studies;
    return (

        <React.Fragment >
            <CssBaseline />
            <SearchBox />
            <HumanAnatomyCard />
        </React.Fragment>

    );
}
export default MainContent;
