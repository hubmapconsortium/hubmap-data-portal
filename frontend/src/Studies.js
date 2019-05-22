import React from "react";
import Study from "./Study";

function Studies(props)
{
	const studies = props.studies;
	console.log("Studies js");
	console.log(props);
	console.log(studies);
	return (
		<div className={"studiesList"}>
					{ studies.map(study => (
						<Study key={study['id']} study={study}>
						</Study>
					))}
		</div>
	);
}

export default Studies;