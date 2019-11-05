/* eslint-disable linebreak-style */

import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import style from '../style/main.less';

const Occupancy = ({ furnitureType, instanceOccupancy, typeOccupancy }) => {
  const lastChar = furnitureType[furnitureType.length - 1];
  const pluralFurnitureType = lastChar === 'h' || lastChar === 's' ? `${furnitureType}es` : `${furnitureType}s`;
  return (
    <>
      <Paper>
        <Typography className={style.brownText}>{`Selected ${furnitureType} takes up ${instanceOccupancy} of the room.`}</Typography>
        <Typography className={style.brownTextBigger}>{`The ${pluralFurnitureType} take up ${typeOccupancy} of the space altogether.`}</Typography>
      </Paper>
    </>

  );
};

export default Occupancy;

Occupancy.propTypes = {
  furnitureType: PropTypes.string.isRequired,
  instanceOccupancy: PropTypes.string.isRequired,
  typeOccupancy: PropTypes.string.isRequired,
};
