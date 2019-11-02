/* eslint-disable linebreak-style */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import styles from '../style/main.less';

const Canvas = ({ width, height }) => {
  const canvasRef = React.useRef(null);
  const [coordinates, addCoordinates] = useState([]);
  const [freehandDrawings, addFreehandDrawing] = useState([]);
  const [roomExists, makeRoomExist] = useState(false);
  const offset = { x: 100, y: 100 };

  function connectPonts(context) {
    context.beginPath();
    coordinates.forEach((point, i) => {
      i === 0
        ? context.moveTo(point.x, point.y)
        : context.lineTo(point.x, point.y);
    });
    context.closePath();
    context.stroke();
    makeRoomExist(true);
  }

  function drawPoint(context, latestCoordinates) {
    const { x, y } = latestCoordinates;
    context.fillRect(x, y, 4, 4);
    if (coordinates.length === 4) {
      connectPonts(context);
    }
  }

  function drawFreehand(context, latestCoordinates) {
    const { x, y } = latestCoordinates;
    context.fillRect(x, y, 2, 2);
  }

  function handleClick(e) {
    const clickCoordinates = {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    };
    addCoordinates([...coordinates, clickCoordinates]);
  }

  function handleDrag(e) {
    const dragCoordinates = {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    };
    addFreehandDrawing([...freehandDrawings, dragCoordinates]);
  }

  useEffect(() => {
    const { current } = canvasRef;
    const context = current.getContext('2d');
    if (coordinates.length > 0 && !roomExists) {
      context.lineWidth = 10;
      context.fillStyle = '#553739';
      const [newCoordinates] = coordinates.slice(-1);
      drawPoint(context, newCoordinates);
    } else if (freehandDrawings.length > 0 && roomExists) {
      context.lineWidth = 2;
      context.fillStyle = '#b38d97';
      const [newDrawing] = freehandDrawings.slice(-1);
      drawFreehand(context, newDrawing);
    }
  });

  return (
    <Paper className={styles.room}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={(e) => {
          handleClick(e);
        }}
        onMouseMove={(e) => {
          console.log(e.buttons);
          e.buttons === 1 && roomExists ? handleDrag(e) : null;
        }}
      />
    </Paper>
  );
};

export default Canvas;

Canvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

Canvas.defaultProps = {
  width: 600,
  height: 600,
};
