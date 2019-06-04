import {ReactComponent as ReactComp} from "../images/Human_body_silhouette_minimal.svg";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import grey from '@material-ui/core/colors/grey';
import { Container } from "@material-ui/core";


function HumanAnatomyCard(){
    return (
        <div className="svgclass">
            <ReactComp />
    </div>
    );
}
export default HumanAnatomyCard;