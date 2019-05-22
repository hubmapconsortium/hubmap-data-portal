import React from "react";
import {ReactComponent as ReactComp} from "./images/Human_body_silhouette.svg";
import Studies from "./Studies";

function MainContent(props)
{
	const studies = props.studies;
	return (
		<div className={"mainRow"}>
		<div className="svgclass">
			<ReactComp />
		</div>
		<Studies studies={studies}/>
		</div>
	);
}
export default MainContent;
