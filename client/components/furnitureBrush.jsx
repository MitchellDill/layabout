/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import Konva from 'konva';
import { Line } from 'react-konva';
import PropTypes from 'prop-types';
import furnitureList from '../model/furnitureList.js';

const FurnitureBrush = ({ type, x, y }) => {
  const [selectedFurniture] = furnitureList.filter((furniture) => furniture.type === type);
  const furnitureStyle = selectedFurniture.style;
  const furnitureInstructions = selectedFurniture.createPoints(x, y);
  console.log(selectedFurniture.area);
  return (
    <Line
      points={[...furnitureInstructions]}
      closed
      fill={furnitureStyle.fill}
      stroke={furnitureStyle.stroke}
      strokeWidth={furnitureStyle.strokeWidth}
      draggable
    />
  );
};

export default FurnitureBrush;

FurnitureBrush.propTypes = {
  type: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

FurnitureBrush.defaultProps = {
  type: 'chair',
};
