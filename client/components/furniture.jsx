/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from '@material-ui/core';

const Furniture = ({ name, count }) => (
  <Card>
    <Typography variant="p">{name}</Typography>
  </Card>
);

export default Furniture;

Furniture.propTypes = {
  furnitureTypes: PropTypes.array,
};

Furniture.defaultProps = {
  furnitureTypes: [],
};
