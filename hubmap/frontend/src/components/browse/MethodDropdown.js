import React from 'react';
import { CustomSelectMenu } from '../../ui-components';
import facets from '../../data/searchfacets.json';

export default function DonorDropdown() {
  const menuCategories = facets.facets.Method;

  return (
    <CustomSelectMenu
      margin="normal"
      variant="outlined"
      menusections={menuCategories}
      menuname="Method"
      width="200px"
    />
  );
}
