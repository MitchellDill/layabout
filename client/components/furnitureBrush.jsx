/* eslint-disable linebreak-style */

import React from 'react';
import Konva from 'konva';
import { Shape } from 'react-konva';
import PropTypes from 'prop-types';

const FurnitureBrush = ({ type, x, y }) => {
  console.log(type);
  return (
    <Shape
      sceneFunc={(context, shape) => {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(220, 80);
        context.quadraticCurveTo(150, 100, 260, 170);
        context.closePath();
        // (!) Konva specific method, it is very important
        context.fillStrokeShape(shape);
      }}
      fill="brown"
      stroke="black"
      strokeWidth={3}
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
