import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

export default function Title(props) {
  const { children } = props;
  return (
    <Typography variant="h5" align="left" color={grey[800]} gutterBottom >
      {children}
    </Typography>
  );
}

Title.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
};
