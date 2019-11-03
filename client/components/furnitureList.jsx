/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import Furniture from './furniture.jsx';

const FurnitureList = ({ furnitureTypes, selectedFurniture, handleClick }) => furnitureTypes.map((furniture, i) => (
  <Furniture
    name={furniture}
    count={0}
    key={`savedFurnitureIndex00${i}`}
    selected={furniture === selectedFurniture}
    handleClick={handleClick}
  />
));

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
