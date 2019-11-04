/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from '@material-ui/core';
import style from '../style/main.less';

const CreateFurniture = ({ handleClick, selected }) => {
  const cardStyle = selected ? 'selectedFurnitureCard' : 'furnitureCard';
  const buttonText = selected ? 'Finish Drawing' : 'Draw Custom Furniture';
  return (
    <Button onClick={(e) => { handleClick(e); }}>
      <Card className={style[cardStyle]}>
        <h3>{buttonText}</h3>
      </Card>
    </Button>
  );
};

export default CreateFurniture;

CreateFurniture.propTypes = {
  handleClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
//   cycleInstructions: PropTypes.func.isRequired,
};
