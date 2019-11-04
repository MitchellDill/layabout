/* eslint-disable linebreak-style */

import React from 'react';
import { Card } from '@material-ui/core';
import PropTypes from 'prop-types';

const Occupancy = ({ furnitureType, instanceOccupancy, typeOccupancy }) => {
  const pluralFurnitureType = furnitureType[furnitureType.length - 1] === 'h' ? `${furnitureType}es` : `${furnitureType}s`;
  return (
    <Card>
      <h3>{`Selected ${furnitureType} takes up ${instanceOccupancy} of the room.`}</h3>
      <h3>{`The ${pluralFurnitureType} take up ${typeOccupancy} of the space altogether.`}</h3>
    </Card>

  );
};

export default Occupancy;

Occupancy.propTypes = {
  furnitureType: PropTypes.string.isRequired,
  instanceOccupancy: PropTypes.string.isRequired,
  typeOccupancy: PropTypes.string.isRequired,
};
