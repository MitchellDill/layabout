/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Instruction = ({ message, isErrorShown }) => {
  const messageDisplayed = isErrorShown ? 'Error! You either need a room, or you need a bigger room.' : message;
  return (
    <>
      <Typography variant="h3">{`${messageDisplayed}`}</Typography>
    </>
  );
};

export default Instruction;

Instruction.propTypes = {
  message: PropTypes.string.isRequired,
  isErrorShown: PropTypes.bool.isRequired,
};
