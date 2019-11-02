/* eslint-disable linebreak-style */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../style/main.less';

const Canvas = ({ width, height }) => {
  const canvasRef = React.useRef(null);
  const [coordinates, addCoordinates] = useState([]);
  const offset = { x: 100, y: 100 };

  function drawPoint(context, latestCoordinates) {
    const { x, y } = latestCoordinates;
    context.fillRect(x, y, 4, 4);
    // console.log(latestCoordinates);
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

  function handleClick(e) {
    const clickCoordinates = {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    };
    addCoordinates([...coordinates, clickCoordinates]);
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={styles.room}
        onClick={(e) => {
          handleClick(e);
        }}
      />
    </>
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
