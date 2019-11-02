/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Button } from '@material-ui/core';
import style from '../style/main.less';

const Furniture = ({
  name, count, handleClick, selected,
}) => {
  const cardStyle = selected ? 'selectedFurnitureCard' : 'furnitureCard';
  return (
    <Button onClick={(e) => { handleClick(e); }}>
      <Card className={style[cardStyle]}>
        <Typography variant="h3">{`${name}`}</Typography>
      </Card>
    </Button>
  );
};

export default Furniture;

Furniture.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

Furniture.defaultProps = {
  selected: false,
};
