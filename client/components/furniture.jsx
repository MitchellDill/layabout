/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from '@material-ui/core';
import style from '../style/main.less';

const Furniture = ({ name, count }) => (
  <Card className={style.furnitureCard}>
    <Typography variant="h3">{name}</Typography>
  </Card>
);

export default Furniture;

Furniture.propTypes = {
  furnitureTypes: PropTypes.array,
};

Furniture.defaultProps = {
  furnitureTypes: [],
};
