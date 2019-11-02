/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import Furniture from './furniture';

const FurnitureList = ({ furnitureTypes }) => furnitureTypes.map((furniture, i) => {
    return <Furniture key={`savedFurnitureIndex00${i}`} />;
  });

export default FurnitureList;

FurnitureList.propTypes = {
  furnitureTypes: PropTypes.array,
};

FurnitureList.defaultProps = {
  furnitureTypes: [],
};
