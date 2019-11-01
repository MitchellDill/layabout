/* eslint-disable linebreak-style */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../style/main.less';

const Canvas = ({ width, height }) => {
  const canvasRef = React.useRef(null);
  const [coordinates, addCoordinates] = useState([]);

  function draw(context, latestCoordinates) {
    // coordinates should have an x and a y
    const { x, y } = latestCoordinates;
    context.fillRect(x, y, 5, 5);
    // console.log(latestCoordinates);
  }

  useEffect(() => {
    const { current } = canvasRef;
    const context = current.getContext('2d');
    // context.clearRect(0, 0, window.innerHeight, window.innerWidth);
    // coordinates.forEach((xy) => draw(context, xy));
    if (coordinates.length > 0) {
      const [newCoordinates] = coordinates.slice(-1);
      draw(context, newCoordinates);
    }
  });

  function handleClick(e) {
    addCoordinates([...coordinates, clickCoordinates]);
    const clickCoordinates = { x: e.clientX, y: e.clientY };
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        id="roomCanvas"
        width={width}
        height={height}
        className={styles.room}
        onMouseMove={(e) => {
          //   console.log(e.buttons, e.pageX, e.pageY, e.screenX, e.screenY);
          e.buttons === 1 ? handleClick(e) : null;
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
  width: 800,
  height: 800,
};
