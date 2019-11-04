/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';

const Instruction = ({ message, isErrorShown }) => {
  const messageDisplayed = isErrorShown ? 'Error! You either need a room, or you need a bigger room.' : message;
  return (
    <header>
      <h1>{`${messageDisplayed}`}</h1>
    </header>
  );
};

export default Instruction;

Instruction.propTypes = {
  message: PropTypes.string.isRequired,
  isErrorShown: PropTypes.bool.isRequired,
};
