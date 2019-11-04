/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

import React, { useState, useEffect } from 'react';
import Konva from 'konva';
import { Line } from 'react-konva';
import PropTypes from 'prop-types';
import furnitureList from '../model/furnitureList.js';

const FurnitureBrush = ({
  type, x, y, updateLayout, handleClick, index,
}) => {
  const [isDragging, drag] = useState(false);

  const [selectedFurniture] = furnitureList.filter((furniture) => furniture.type === type);
  const furnitureStyle = selectedFurniture.style;
  const furnitureInstructions = selectedFurniture.createPoints(x, y);

  return (
    <Line
      points={[...furnitureInstructions]}
      closed
      fill={furnitureStyle.fill}
      stroke={furnitureStyle.stroke}
      strokeWidth={furnitureStyle.strokeWidth}
      draggable
      onDragStart={() => {
        drag(true);
        console.log('dragged');
      }}
      onDragEnd={(e) => {
        drag(false);
        const newX = e.target.x();
        const newY = e.target.y();
        updateLayout(newX, newY, index, false);
      }}
      onClick={(e) => {
        console.log(e);
      }}
    />
  );
};

export default FurnitureBrush;

FurnitureBrush.propTypes = {
  type: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  updateLayout: PropTypes.func.isRequired,
};

FurnitureBrush.defaultProps = {
  type: 'chair',
};
