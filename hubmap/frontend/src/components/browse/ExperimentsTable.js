/* eslint-disable max-len */
/* eslint-disable no-script-url */

import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import experiments from '../../data/experiments.json';

export default class ExperimentsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      order:'asc',
      orderBy: false,
    }
  }

  experimentsDict = experiments.experiments;

  columnNames = Object.keys(this.experimentsDict[1]);

  columns = [];

  experimentsRows = [];

  handleRequestSort(event, property) {
    const { order, orderBy } = this.state;
    const isDesc = orderBy === property && order === 'desc';
    /* this.setState({
      order: isDesc ? 'asc' : 'desc',
      orderBy: property,
    });*/
  }

  getColumns(order, orderBy) {
    for (const i in this.columnNames) {
      this.columns.push(<TableCell style={{
        minWidth: '80px', fontWeight: 'bold', color: 'black', fontSize: '10px',
      }}
      >
        <TableSortLabel
          active={orderBy === this.columnNames[i]}
          direction={order}
          onClick={this.handleRequestSort(this.columnNames[i])}
        >
          {this.columnNames[i]}
        </TableSortLabel>
                        </TableCell>);
    }
  }

  getRows() {
    for (const key in this.experimentsDict) {
      const keys = Object.keys(this.experimentsDict[key]);
      this.experimentsRows.push(
        <TableRow key={key}>
          {keys.map((k) => (<TableCell>{this.experimentsDict[key][k]} </TableCell>))}

        </TableRow>,
      );
    }
  }

  render() {
    this.getColumns();
    this.getRows();

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
