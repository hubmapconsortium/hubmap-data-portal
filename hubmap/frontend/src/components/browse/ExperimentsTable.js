/* eslint-disable react/jsx-closing-tag-location */

import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PropTypes from 'prop-types';
import experiments from '../../data/experiments.json';

const headCells2 = [
  {
    id: 'id', numeric: false, disablePadding: false, label: 'Id',
  },
  {
    id: 'Experiment Title', numeric: false, disablePadding: false, label: 'Experiment Title',
  },
  {
    id: 'Sample Type', numeric: false, disablePadding: false, label: 'Sample Type',
  },
  {
    id: 'Organ/Model Organ', numeric: false, disablePadding: false, label: 'Organ/Model Organ',
  },
  {
    id: 'Selected Cell Type', numeric: false, disablePadding: false, label: 'Selected Cell Type',
  },
  {
    id: 'Library Construction Method', numeric: false, disablePadding: false, label: 'Library Construction Method',
  },
  {
    id: 'Species', numeric: false, disablePadding: false, label: 'Species',
  },
  {
    id: 'Known Diseases', numeric: false, disablePadding: false, label: 'Known Diseases',
  },
  {
    id: 'Donor Count', numeric: false, disablePadding: false, label: 'Donor Count',
  },
  {
    id: 'Cell Count Estimate', numeric: false, disablePadding: false, label: 'Cell Count Estimate',
  },
];


function CustomTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  // const { order, orderBy } = this.state;
  const columnsHeaders = [];
  return (
    <TableHead fixedHeader>
      <TableRow head>
        {
            headCells2.forEach((column) => (
              columnsHeaders.push(<TableCell
                style={{
                  fontWeight: 'bold', color: 'black', fontSize: '10px',
                }}
                key={column.id}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >

                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={createSortHandler(column.id)}
                >
                  {column.label}

                </TableSortLabel>
              </TableCell>)
            ))
        }
        {columnsHeaders}
      </TableRow>
    </TableHead>
  );
}

CustomTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default class ExperimentsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'desc',
      orderBy: 'Id',
    };
    this.handleRequestSort = this.handleRequestSort.bind(this);
  }

  experimentsDict = experiments.experiments;

  columns = [];

  experimentsRows = [];

  getRows(order, orderBy) {
    let cells = [];
    let sortedEntries = [];
    if (order === 'desc') {
      sortedEntries = Object.values(this.experimentsDict)
        .sort((a, b) => ((a[orderBy] > b[orderBy]) ? 1 : -1));
    } else {
      sortedEntries = Object.values(this.experimentsDict)
        .sort((a, b) => ((a[orderBy] < b[orderBy]) ? 1 : -1));
    }
    sortedEntries.forEach((experiment) => {
      Object.values(experiment).forEach((cell) => {
        cells.push(<TableCell>{cell} </TableCell>);
      });
      this.experimentsRows.push(
        <TableRow key={experiment.id}>
          {cells}
        </TableRow>,
      );
      cells = [];
    });
  }

  handleRequestSort(event, property) {
    const { order, orderBy } = this.state;
    const isDesc = orderBy === property && order === 'desc';
    this.setState({
      order: isDesc ? 'asc' : 'desc',
      orderBy: property,
    });
    this.experimentsRows = [];
    this.getRows(isDesc ? 'asc' : 'desc', property);
  }

  componentWillMount() {
    this.experimentsRows = [];
    this.columns = [];
    this.getRows();
  }

  render() {
    const { order, orderBy } = this.state;
    return (
      <>
        <Table size="medium">
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
          <CustomTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={this.handleRequestSort}
          />


          <TableBody>
            {this.experimentsRows}
          </TableBody>
        </Table>
      </>
    );
  }
}
