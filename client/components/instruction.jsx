/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';

const Instruction = ({ message, isErrorShown }) => {
  const messageDisplayed = isErrorShown ? 'You need to draw a room, first.' : message;
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
