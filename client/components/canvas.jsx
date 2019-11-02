/* eslint-disable linebreak-style */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import styles from '../style/main.less';

const Canvas = ({ width, height }) => {
  const canvasRef = React.useRef(null);
  const [coordinates, addCoordinates] = useState([]);
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
  }

  function drawPoint(context, latestCoordinates) {
    const { x, y } = latestCoordinates;
    context.fillRect(x, y, 2, 2);
    if (coordinates.length === 4) {
      connectPonts(context);
    }
    // console.log(latestCoordinates);
  }

  function handleClick(e) {
    const clickCoordinates = {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    };
    addCoordinates([...coordinates, clickCoordinates]);
  }

  useEffect(() => {
    const { current } = canvasRef;
    const context = current.getContext('2d');
    context.fillStyle = '#553739';
    if (coordinates.length > 0) {
      const [newCoordinates] = coordinates.slice(-1);
      drawPoint(context, newCoordinates);
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
