/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core';

const Furniture = ({ name, count }) => <Card></Card>;

export default FurnitureList;

FurnitureList.propTypes = {
  furnitureTypes: PropTypes.array,
};

FurnitureList.defaultProps = {
  furnitureTypes: [],
};
