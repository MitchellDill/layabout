/* eslint-disable linebreak-style */

import React from 'react';
import Konva from 'konva';
import { Shape } from 'react-konva';
import PropTypes from 'prop-types';

const ShapeWrapper = ({ type, x, y }) => {
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
      fill="#00D2FF"
      stroke="black"
      strokeWidth={4}
      draggable
    />
  );
};

export default ShapeWrapper;

ShapeWrapper.propTypes = {
  type: PropTypes.string,
};

ShapeWrapper.defaultProps = {
  type: 'chair',
};
