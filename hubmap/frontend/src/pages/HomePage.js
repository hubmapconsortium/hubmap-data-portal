import React from 'react';
import HumanSvg from "../components/home/HumanSvgWithSearchComponent";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import CellCountByTissueChart from "../components/home/CellCountByTissueChart"
import ImageCountByTissuesChart from '../components/home/ImageCountByTissueChart';
import MaterialTableDemo from '../components/home/MUITable';
import ExperimentsBarChart from '../components/home/BarChart';
import ImageCountStackedChart from '../components/home/D3chart';
import viridis from '../images/viridis.png'
import * as actions from '../middleware/actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  humanClass:
  {
    marginTop: "-30px",
  },
  humanPaper: {
    flex: 1,
    width: "320px",
    height: "650px",
    border: '0px solid #fafafa',
    backgroundColor: grey[300],
    color: grey[800],
    marginTop: theme.spacing(1),
    padding: theme.spacing(1, 1, 1, 1),
  },
  chartPaper: {
    flex: 1,
    width: "420px",
    height: "650px",
    border: '0px solid #fafafa',
    backgroundColor: grey[300],
    color: grey[800],
    marginTop: theme.spacing(1),
    padding: theme.spacing(1, 1, 1, 1),
  },

}));
class HomeComponent extends React.Component {

  componentDidMount() {
    actions.getAllExperiments();
    actions.getGeneTissueColors();
  }
  render() {

    return (
      <Grid container className={useStyles.root} spacing={8} margin-top="20px">
        <Grid item style={{ height: 30 }}>
        </Grid>
        <Grid item style={{ height: '300px', width: '10px', marginTop: '120px', marginLeft: '-150px' }}>
          <img id="tab10ColorMap" src={viridis} style={{ transform: 'scale(0.6)', WebkitTransform: 'scale(0.6)', display: 'none', marginLeft:'-150px' }} alt="Color Map" />
        </Grid>
        <Grid item style={{ height: '700px', width: '320px', marginTop: '120px', marginLeft: '-150px' }} >
          <HumanSvg experiments={''} />
        </Grid>
        <Grid item style={{ height: '420px', width: '420px', marginTop: '180px', marginLeft: '120px' }}>
          <CellCountByTissueChart />
        </Grid>
        <Grid item style={{ height: '420px', width: '450px', marginTop: '180px', marginLeft: '30px' }}>
          <ImageCountByTissuesChart />
        </Grid>
        <Grid item style={{ height: '450px', width: '900px', marginTop: '-250px', marginLeft: '290px' }}>
          <MaterialTableDemo />
        </Grid>
        <Grid item style={{ height: '700px', width: '1200px', marginTop: '250px', marginLeft: '0px' }}>
          <ExperimentsBarChart />
        </Grid>
        <Grid item style={{ height: '700px', width: '1200px', marginTop: '250px', marginLeft: '0px' }}>
          <ImageCountStackedChart />
        </Grid>
      </Grid>);
  }
}
export default HomeComponent;