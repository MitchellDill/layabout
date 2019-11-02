/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import Furniture from './furniture.jsx';

const FurnitureList = ({ furnitureTypes }) => furnitureTypes.map((furniture, i) => (
    <Furniture name={furniture} key={`savedFurnitureIndex00${i}`} />
  ));

export default FurnitureList;

FurnitureList.propTypes = {
  furnitureTypes: PropTypes.array,
};

FurnitureList.defaultProps = {
  furnitureTypes: [],
};
