import React from "react";
import Studies from "./Studies";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import grey from '@material-ui/core/colors/grey';
import HumanAnatomyCard from "./Anatomy";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import StudiesChart from "./StudiesChart"

function MainContent(props)
{
	const studies = props.studies;
	return (
        <div className="mainRow">
            <React.Fragment>
                <CssBaseline />
                    <HumanAnatomyCard />
            </React.Fragment>
            
		    <Studies studies={studies}/>
            </div>

	);
}
export default MainContent;
