import React from 'react';
import { BaseSelectDropdown } from '../../ui-components';
import facets from '../../data/searchfacets.json';

export default function AssaysDropdown() {
  const menuCategories = facets.facets.Assays;

  return (
    <BaseSelectDropdown
      margin="normal"
      variant="outlined"
      menusections={menuCategories}
      menuname="Assays"
      width="200px"
    />
  );
}
