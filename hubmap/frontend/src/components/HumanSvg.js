import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import HumanImage from "./HumanImage";
import SearchBox from "./Search";


function MainContent(props) {
    return (

        <React.Fragment >
            <CssBaseline />
            <SearchBox />
            <HumanImage />
        </React.Fragment>

    );
}
export default MainContent;
