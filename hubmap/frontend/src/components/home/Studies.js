import React from "react";
import Study from "./MUITable";
import { PureComponent } from 'react';
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

class Studies extends React.Component {
    state = {
        studies: [],
        searchString: ''
    }

    getStudiesTable(studies) {
        (useStyles);
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
                { this.props.studies ?
                         this.props.studies.map(study => (
                            <StyledTableRow key={study.id}>
                            <StyledTableCell component="th" scope="row">{study.id}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">{study.subclass.model}</StyledTableCell>
                            <StyledTableCell align="right">{study.institution.name}</StyledTableCell>
                            <StyledTableCell align="right">{study.data_type.name}</StyledTableCell>
                            <StyledTableCell align="right">{study.tissue.name}</StyledTableCell>
                            <StyledTableCell align="right">{study.creation_time}</StyledTableCell>
                            {study.genes !== undefined ?
                            <StyledTableCell align="right">{ study.genes.map( (gene) => gene.hugo_symbol).join(',')}</StyledTableCell>
                            : <StyledTableCell align="right"></StyledTableCell>}
                            {study.proteins !== undefined ?
                            <StyledTableCell align="right">{ study.proteins.map( (protein) => protein.name).join(',')}</StyledTableCell>
                             : <StyledTableCell align="right"></StyledTableCell>}
                            {study.cell_count ?
                            <StyledTableCell align="right">{study.cell_count}</StyledTableCell>
                             : <StyledTableCell align="right"></StyledTableCell>}
                            { study.Unique_barcode_count ?
                            <StyledTableCell align="right">{study.Unique_barcode_count}</StyledTableCell>
                             : <StyledTableCell align="right"></StyledTableCell>}
                             { study.read_count_total ?
                            <StyledTableCell align="right">{study.read_count_total}</StyledTableCell>
                            : <StyledTableCell align="right"></StyledTableCell>}
                            {study.read_count_aligned ?
                            <StyledTableCell align="right">{study.read_count_aligned}</StyledTableCell>
                             : <StyledTableCell align="right"></StyledTableCell>}
                              {study.image_count ?
                            <StyledTableCell align="right">{study.image_count}</StyledTableCell>
                             : <StyledTableCell align="right"></StyledTableCell>}
                          </StyledTableRow>
                        ))

                 : "No studies found"}
                </TableBody>
                </Table>
                </Paper>);
    }
    render() {
        (this.props.studies);
        return (
                this.getStudiesTable(this.props.studies)
        );
    }
}
Studies.propTypes = {
    studies: PropTypes.array,
}
export default Studies;
