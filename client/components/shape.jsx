/* eslint-disable linebreak-style */

import React from 'react';
import Konva from 'konva';
import { Shape } from 'react-konva';
import PropTypes from 'prop-types';

const Shape = (props) => {
    return (
        <Shape
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(20, 50);
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
          onDragStart={() => {
            this.setState({
              isDragging: true,
            });
          }}
          onDragEnd={(e) => {
            this.setState({
              isDragging: false,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
        />
    )
};

export default Shape;

Shape.propTypes = {

};

Shape.defaultProps = {

};
