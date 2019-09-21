/* eslint-disable max-len */
/* eslint-disable no-script-url */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import experiments from '../../data/experiments.json';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));
  
export default class ExperimentsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'desc',
      orderBy: 'Id',
    };
  }

  experimentsDict = experiments.experiments;

  columns = [];

  experimentsRows = [];

  headCells2 = [
    { id: 'id', numeric: false, disablePadding: false, label: 'id'},
    { id: 'Experiment Title', numeric: false, disablePadding: false, label: 'Experiment Title'},
    { id: 'Sample Type', numeric: false, disablePadding: false, label: 'Sample Type' },
    { id: 'Organ/Model Organ', numeric: false, disablePadding: false, label: 'Organ/Model Organ' },
    { id: 'Selected Cell Type', numeric: false, disablePadding: false, label: 'Selected Cell Type' },
    { id: 'Library Construction Method', numeric: false, disablePadding: false, label: 'Library Construction Method' },
    { id: 'Species', numeric: false, disablePadding: false, label: 'Species' },
    { id: 'Known Diseases', numeric: false, disablePadding: false, label: 'Known Diseases' },
    { id: 'Donor Count', numeric: false, disablePadding: false, label: 'Donor Count' },
    { id: 'Cell Count Estimate', numeric: false, disablePadding: false, label: 'Cell Count Estimate' }
  ];

  getColumns() {
    const { order, orderBy } = this.state;
    this.headCells2.forEach((column) => {
      this.columns.push(
        <TableCell
          style={{
            minWidth: '80px', fontWeight: 'bold', color: 'black', fontSize: '10px',
          }}
          key={column.id}
          align={column.numeric ? 'right' : 'left'}
          padding={column.disablePadding ? 'none' : 'default'}
          sortDirection={orderBy === column.id ? order : false}
        >
          <TableSortLabel
            active={orderBy === column.id}
            direction={order}
            onClick={(event) => {
              const { order, orderBy } = this.state;
              console.log(event.target.innerText, orderBy === event.target.innerText && order === 'desc');
              const isDesc = orderBy === event.target.innerText && order === 'desc';
              this.setState({
                order: isDesc ? 'asc' : 'desc',
                orderBy: event.target.innerText,
              });
            }}
          >
            {column.label}
            {orderBy === column.id ? (
              <span className={useStyles.visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>,
      );
    });
  }

  getRows() {
    const { order, orderBy } = this.state;
    let cells = [];
    console.log(Object.values(experiments.experiments));
    this.stableSort(Object.values(experiments.experiments), this.getSorting(order, orderBy)).forEach((experiment) => {
      experiment.forEach((colValue) => {
        cells.push(<TableCell>{colValue} </TableCell>);
      });
      this.experimentsRows.push(
        <TableRow key={experiment.id}>
          {cells}
        </TableRow>
      );
      cells = [];
    });
  }


  desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [Object.values(el), index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      console.log(cmp, a, b, cmp(a[0], b[0]), cmp);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    console.log(stabilizedThis.map((el) => el[0]));
    return stabilizedThis.map((el) => el[0]);
  }
  
  getSorting(order, orderBy) {
    console.log(order, orderBy);
    return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
  }

  componentWillMount() {
    this.experimentsRows = [];
    this.columns = [];
    this.setState({
      order: 'Id',
      orderBy: 'desc',
    })
    this.getColumns();
    this.getRows();
  }

  render() {
    return (
      <>
        <Table size="small">
          <colgroup>
            <col style={{ width: '2%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '5%' }} />
            <col style={{ width: '5%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '5%' }} />
            <col style={{ width: '5%' }} />
          </colgroup>
          <TableHead fixedHeader>
            <TableRow head>
              {this.columns}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.experimentsRows}
          </TableBody>
        </Table>
      </>
    );
  }
}
