/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import Konva from 'konva';
import { Line } from 'react-konva';
import PropTypes from 'prop-types';
import furnitureList from '../model/furnitureDrawings';

const FurnitureBrush = ({ type, x, y }) => {
  const furnitureInstructions = furnitureList[0].createPoints(x, y);
  return (
    <Line
      points={[...furnitureInstructions]}
      closed
      fill="brown"
      stroke="black"
      strokeWidth={2}
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
