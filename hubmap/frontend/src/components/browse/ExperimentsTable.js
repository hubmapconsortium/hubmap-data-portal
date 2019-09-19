/* eslint-disable max-len */
/* eslint-disable no-script-url */

import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import experiments from '../../data/experiments.json';

// Generate Order Data
function createData(experimentTitle, sampleType, organ, selectedCellType, libraryConstructionMethod, pairedEnd,
  species, knownDiseases, projectDownloads, donorCount, cellCountEstimate) {
  return {
    experimentTitle,
    sampleType,
    organ,
    selectedCellType,
    libraryConstructionMethod,
    pairedEnd,
    species,
    knownDiseases,
    projectDownloads,
    donorCount,
    cellCountEstimate,
  };
}

export default function ExperimentsTable() {
  const experimentsDict = experiments.experiments;
  let columnNames = Object.keys(experimentsDict[1]);
  let columns = [];
  var experimentsRows = [];
  console.log(columnNames, experimentsRows);
  for ( const i in columnNames){
    columns.push(<TableCell style={{minWidth: '80px', fontWeight: 'bold', color:'black', fontSize:'10px'}}>{columnNames[i]}</TableCell>);   
  }
  for (const key in experimentsDict)
  {
      console.log(key, experimentsDict[key], experimentsDict[key][0]);
      const keys = Object.keys(experimentsDict[key]);
          experimentsRows.push(
            <TableRow key={key}>
              {keys.map((k) =>{
                return ( <TableCell>{experimentsDict[key][k]} </TableCell>);
             })}

            </TableRow>
          );
      console.log(experimentsRows[0]);
  }
  return (
    <>
      <Table size="small">
        <colgroup>
          <col style={{width:'2%'}} />
          <col style={{width:'30%'}} />
          <col style={{width:'5%'}} />
          <col style={{width:'5%'}} />
          <col style={{width:'15%'}} />
          <col style={{width:'15%'}} />
          <col style={{width:'10%'}} />
          <col style={{width:'25%'}} />
          <col style={{width:'5%'}} />
          <col style={{width:'5%'}} />
        </colgroup>
        <TableHead fixedHeader>
          <TableRow head>
            {columns}
          </TableRow>
        </TableHead>
        <TableBody>
          
          {experimentsRows}
        </TableBody>
      </Table>
    </>
  );
}
