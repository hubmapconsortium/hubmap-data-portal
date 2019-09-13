import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BaseDropdownPanel } from '../../ui-components/';
import facets from '../../data/searchfacets.json';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(1),
  },
  textField: {
    backgroundColor: '#ffffff',
  },
}));

export default function DonorDropdown() {
  const menuitems = ['Species', 'Homo Sapiens', 'Mus musculus'];
  const menuCategories = facets.facets.Donor;

  const htmlElements = [];
  for(const key in menuCategories) {
    console.log(menuCategories[key], key);
    htmlElements.push(<BaseDropdownPanel
     menuitems={menuCategories[key]}
     menuname={key}
  />);
  }
  return (
    <div>
        {htmlElements}
    </div>
  );
}
