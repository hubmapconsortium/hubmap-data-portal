import React from 'react';
import { CustomSelectMenu } from '../../ui-components';
import facets from '../../data/searchfacets.json';

export default function DonorDropdown() {
  const menuCategories = facets.facets.Donor;

  return (
    <CustomSelectMenu
      margin="normal"
      variant="outlined"
      menusections={menuCategories}
      menuname="Donor"
      width="200px"
    />
  );
}
