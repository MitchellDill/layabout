/* eslint-disable linebreak-style */

import React from 'react';
import { Card } from '@material-ui/core';
import PropTypes from 'prop-types';

const Occupancy = ({ furnitureType, instanceOccupancy }) => (
  <Card>
    <h3>{`Selected ${furnitureType} takes up ${instanceOccupancy} of the room.`}</h3>
  </Card>
);

export default Occupancy;

Occupancy.propTypes = {
  furnitureType: PropTypes.string.isRequired,
  instanceOccupancy: PropTypes.string.isRequired,
};
