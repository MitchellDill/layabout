/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import styles from '../style/main.less';
import isPointInPolygon from '../model/mathHelpers.js';

const Canvas = ({
  width, height, cycleInstructions, isCreateButtonOn,
}) => {
  const canvasRef = React.useRef(null);
  const offset = { x: 100, y: 100 };

  // hooks below
  const [coordinates, addCoordinates] = useState([]);
  const [freehandDrawings, addFreehandDrawing] = useState([]);
  const [roomExists, makeRoomExist] = useState(false);

  function connectPonts(context) {
    context.beginPath();
    coordinates.forEach((point, i) => {
      i === 0
        ? context.moveTo(point.x, point.y)
        : context.lineTo(point.x, point.y);
    });
    context.closePath();
    context.stroke();

    // move forward in stage of app usage, based around using this only for a room
    makeRoomExist(true);
    cycleInstructions();
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
    const roomBoundaries = Object.values(coordinates);
    if (isPointInPolygon(dragCoordinates, roomBoundaries)) {
      addFreehandDrawing([...freehandDrawings, dragCoordinates]);
    }
  }

  useEffect(() => {
    const { current } = canvasRef;
    const context = current.getContext('2d');
    if (coordinates.length > 0 && !roomExists) {
      context.lineWidth = 7;
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
          if (e.buttons === 1 && roomExists && isCreateButtonOn) {
            handleDrag(e);
          } else if (isCreateButtonOn && !roomExists) {
            cycleInstructions(404);
          }
        }}
      />
    </Paper>
  );
};

export default Canvas;

Canvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  cycleInstructions: PropTypes.func.isRequired,
  isCreateButtonOn: PropTypes.bool.isRequired,
};

Canvas.defaultProps = {
  width: 600,
  height: 600,
};
