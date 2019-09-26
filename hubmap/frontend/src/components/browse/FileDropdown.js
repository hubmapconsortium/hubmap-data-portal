import React from 'react';
import { BaseSelectDropdown } from '../../ui-components';
import facets from '../../data/searchfacets.json';

export default function DonorDropdown() {
  const menuCategories = facets.facets.File;

  return (
    <BaseSelectDropdown
      margin="normal"
      variant="outlined"
      menusections={menuCategories}
      menuname="File"
      width="200px"
    />
  );
}
