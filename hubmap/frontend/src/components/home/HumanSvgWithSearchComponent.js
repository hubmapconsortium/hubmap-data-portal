import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import HumanAnatomyCard from './HumanSvgComponent';
import SearchBox from './Search';


function MainContent(props) {
  return (

    <>
      <CssBaseline />
      <SearchBox />
      <HumanAnatomyCard />
    </>

  );
}
export default MainContent;
