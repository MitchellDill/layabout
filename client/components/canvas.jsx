/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../style/main.less';

const Canvas = ({ width, height }) => (
  <>
    <canvas
      id="roomCanvas"
      width={width}
      height={height}
      className={styles.room}
    />
  </>
);

export default Canvas;

Canvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

Canvas.defaultProps = {
  width: 800,
  height: 800,
};
