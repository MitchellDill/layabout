/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import { ExpansionPanelSummary } from '@material-ui/core';
import Furniture from './furniture.jsx';

const FurnitureList = ({
  furnitureTypes, selectedFurniture, handleClick, instanceOccupancy, typeOccupancy,
}) => (
  furnitureTypes.map((furniture, i) => (
    <Furniture
      name={furniture}
      count={0}
      key={`savedFurnitureIndex00${i}`}
      selected={furniture === selectedFurniture}
      handleClick={handleClick}
      instanceOccupancy={instanceOccupancy}
      typeOccupancy={typeOccupancy}
    />

  ))
);

export default FurnitureList;

FurnitureList.propTypes = {
  furnitureTypes: PropTypes.array,
  selectedFurniture: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

FurnitureList.defaultProps = {
  furnitureTypes: ['Table'],
  selectedFurniture: '',
};
