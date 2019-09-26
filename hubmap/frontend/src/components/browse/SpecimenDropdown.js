import React from 'react';
import { CustomSelectMenu } from '../../ui-components';
import facets from '../../data/searchfacets.json';

export default function SpecimenComponent() {
  const menuCategories = facets.facets.Specimen;
  return (
    <CustomSelectMenu
      margin="normal"
      variant="outlined"
      menusections={menuCategories}
      menuname="Specimen"
      width="200px"
    />
  );
}
