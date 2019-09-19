import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CustomSelectMenu } from '../../ui-components';
import facets from '../../data/searchfacets.json';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(1),
  },
  textField: {
    //backgroundColor: '#ffffff',
  },
}));

export default function AssaysDropdown() {
  const menuCategories = facets.facets.Assays;

  return (<CustomSelectMenu 
        margin="normal"
          variant="outlined"
          menusections={ menuCategories}
          menuname="Assays"
          width='200px'
        />
  );
}
