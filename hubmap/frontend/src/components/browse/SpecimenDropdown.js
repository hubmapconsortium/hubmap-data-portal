import React from 'react';
import { BaseSelectDropdown } from '../../ui-components';
import facets from '../../data/searchfacets.json';

export default function SpecimenComponent() {
  const menuCategories = facets.facets.Specimen;
  return (
    <BaseSelectDropdown
      margin="normal"
      variant="outlined"
      menusections={menuCategories}
      menuname="Specimen"
      width="200px"
    />
  );
}
