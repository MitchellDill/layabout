/* eslint-disable linebreak-style */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../style/main.less';

const Canvas = ({ width, height }) => {
  const canvasRef = React.useRef(null);
  const [coordinates, addCoordinates] = useState([]);
  console.log(coordinates);
  return (
    <>
      <canvas
        ref={canvasRef}
        id="roomCanvas"
        width={width}
        height={height}
        className={styles.room}
        onClick={(e) => {
          handleClick(e, canvasRef);
          addCoordinates([...coordinates, coordinates]);
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

const handleClick = (e, ref) => {
  const { current } = ref;
  const { id } = current;
  id === 'roomCanvas' ? getCanvasContext(current) : console.log('not a canvas');
};

const draw = (context, coordinates) => {
  // coordinates should have an x and a y
  console.log('drawin here');
};

const getCanvasContext = (canvasRef) => {
  const context = canvasRef.getContext('2d');
  draw(context, 0);
};
