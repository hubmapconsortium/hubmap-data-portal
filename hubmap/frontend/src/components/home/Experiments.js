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
           {heads}
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
                  <StyledTableCell align="right">{experiment.genes !== undefined ?experiment.genes.map((gene) => gene.hugo_symbol).join(','):''}</StyledTableCell>
                  <StyledTableCell align="right">{experiment.proteins !== undefined ?experiment.proteins.map((protein) => protein.name).join(','):''}</StyledTableCell>
                  <StyledTableCell align="right">{experiment.cell_count}</StyledTableCell>
                  <StyledTableCell align="right">{experiment.Unique_barcode_count}</StyledTableCell>
                  <StyledTableCell align="right">{experiment.read_count_total?experiment.read_count_total:null}</StyledTableCell>
                  <StyledTableCell align="right">{experiment.read_count_aligned?experiment.read_count_aligned:null}</StyledTableCell>
                  <StyledTableCell align="right">{experiment.image_count? experiment.image_count:null}</StyledTableCell>
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
