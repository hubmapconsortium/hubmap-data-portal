/* eslint-disable max-len */
/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

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

const rows = [
  createData(
    'experimentTitle',
    'sampleType',
    'organ',
    'selectedCellType',
    'libraryConstructionMethod',
    'pairedEnd',
    'species',
    'knownDiseases',
    'projectDownloads',
    'donorCount',
    'cellCountEstimate',
  ),
];

export default function Experiments() {
  return (
    <>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Experiment Title</TableCell>
            <TableCell>Sample Type</TableCell>
            <TableCell>Organ/Model Organ</TableCell>
            <TableCell>Selected Cell Type</TableCell>
            <TableCell>Library Construction method</TableCell>
            <TableCell>Paired End</TableCell>
            <TableCell>Species</TableCell>
            <TableCell>Known Diseases (Specimen) </TableCell>
            <TableCell>Project Downloads</TableCell>
            <TableCell>Donor Count</TableCell>
            <TableCell>Cell Count Estimate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.experimentTitle}>
              <TableCell>{row.experimentTitle} </TableCell>
              <TableCell> {row.sampleType}</TableCell>
              <TableCell> {row.organ}</TableCell>
              <TableCell>{row.selectedCellType}</TableCell>
              <TableCell>{row.libraryConstructionMethod}</TableCell>
              <TableCell>{row.pairedEnd}</TableCell>
              <TableCell>{row.species}</TableCell>
              <TableCell>{row.knownDiseases}</TableCell>
              <TableCell>{row.projectDownloads}</TableCell>
              <TableCell>{row.donorCount}</TableCell>
              <TableCell>{row.cellCountEstimate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
