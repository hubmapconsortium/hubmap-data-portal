import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import HumanAnatomyCard from "./Anatomy";

function MainContent(props)
{
	const studies = props.studies;
	return (
        <div className="mainRow">
            <React.Fragment>
                <CssBaseline />
                    <HumanAnatomyCard />
            </React.Fragment>
            
            </div>

	);
}
export default MainContent;
