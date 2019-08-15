import React from "react";
import grey from '@material-ui/core/colors/grey';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: grey[800],
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: grey[300],
    },
  },
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));

class Experiments extends React.Component {
  state = {
    experiments: [],
    searchString: ''
  }

  getExperimentsTable(experiments) {
    return (<Paper className={useStyles.root}>
      <Table className={useStyles.table} title="Studies from HuBMAP Consortium">
        <TableHead>
          <TableRow backgroundColor={grey[300]}>
            <StyledTableCell align="right">Id</StyledTableCell>
            <StyledTableCell align="right">Study type</StyledTableCell>
            <StyledTableCell align="right">Institution</StyledTableCell>
            <StyledTableCell align="right">Data type</StyledTableCell>
            <StyledTableCell align="right">Tissue</StyledTableCell>
            <StyledTableCell align="right">Uploaded on</StyledTableCell>
            <StyledTableCell align="right">Genes </StyledTableCell>
            <StyledTableCell align="right">Proteins</StyledTableCell>
            <StyledTableCell align="right"># Cells</StyledTableCell>
            <StyledTableCell align="right"># Unique barcode </StyledTableCell>
            <StyledTableCell align="right"># Reads </StyledTableCell>
            <StyledTableCell align="right"># Reads Aligned </StyledTableCell>
            <StyledTableCell align="right"># Images </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.experiments ?
            this.props.experiments.map(experiment => (
              <StyledTableRow key={experiment.id}>
                <StyledTableCell component="th" scope="row">{experiment.id}</StyledTableCell>
                <StyledTableCell component="th" scope="row">{experiment.subclass.model}</StyledTableCell>
                <StyledTableCell align="right">{experiment.institution.name}</StyledTableCell>
                <StyledTableCell align="right">{experiment.data_type.name}</StyledTableCell>
                <StyledTableCell align="right">{experiment.tissue.name}</StyledTableCell>
                <StyledTableCell align="right">{experiment.creation_time}</StyledTableCell>
                {experiment.genes !== undefined ?
                  <StyledTableCell align="right">{experiment.genes.map((gene) => gene.hugo_symbol).join(',')}</StyledTableCell>
                  : <StyledTableCell align="right"></StyledTableCell>}
                {experiment.proteins !== undefined ?
                  <StyledTableCell align="right">{experiment.proteins.map((protein) => protein.name).join(',')}</StyledTableCell>
                  : <StyledTableCell align="right"></StyledTableCell>}
                {experiment.cell_count ?
                  <StyledTableCell align="right">{experiment.cell_count}</StyledTableCell>
                  : <StyledTableCell align="right"></StyledTableCell>}
                {experiment.Unique_barcode_count ?
                  <StyledTableCell align="right">{experiment.Unique_barcode_count}</StyledTableCell>
                  : <StyledTableCell align="right"></StyledTableCell>}
                {experiment.read_count_total ?
                  <StyledTableCell align="right">{experiment.read_count_total}</StyledTableCell>
                  : <StyledTableCell align="right"></StyledTableCell>}
                {experiment.read_count_aligned ?
                  <StyledTableCell align="right">{experiment.read_count_aligned}</StyledTableCell>
                  : <StyledTableCell align="right"></StyledTableCell>}
                {experiment.image_count ?
                  <StyledTableCell align="right">{experiment.image_count}</StyledTableCell>
                  : <StyledTableCell align="right"></StyledTableCell>}
              </StyledTableRow>
            ))

            : "No experiments found"}
        </TableBody>
      </Table>
    </Paper>);
  }
  render() {
    return (
      this.getExperimentsTable(this.props.experiments)
    );
  }
}
Experiments.propTypes = {
  experiments: PropTypes.array,
}
export default Experiments;
