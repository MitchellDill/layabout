/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../style/main.less';

const Canvas = ({ width, height, handleClick }) => {
  const canvasRef = React.useRef(null);
  return (
    <>
      <canvas
        ref={canvasRef}
        id="roomCanvas"
        width={width}
        height={height}
        className={styles.room}
        onClick={(e) => handleClick(e, canvasRef)}
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
