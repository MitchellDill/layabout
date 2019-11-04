/* eslint-disable linebreak-style */

import React from 'react';
import { Card, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const Occupancy = ({ furnitureType, instanceOccupancy, typeOccupancy }) => {
  const pluralFurnitureType = furnitureType[furnitureType.length - 1] === 'h' ? `${furnitureType}es` : `${furnitureType}s`;
  return (
    <>
      <Typography variant="body1">{`Selected ${furnitureType} takes up ${instanceOccupancy} of the room.`}</Typography>
      <Typography variant="body1">{`The ${pluralFurnitureType} take up ${typeOccupancy} of the space altogether.`}</Typography>
    </>

  );
};

export default Occupancy;

Occupancy.propTypes = {
  furnitureType: PropTypes.string.isRequired,
  instanceOccupancy: PropTypes.string.isRequired,
  typeOccupancy: PropTypes.string.isRequired,
};
