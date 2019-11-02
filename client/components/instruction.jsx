/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';

const Instruction = ({ message }) => (
  <header>
    <h1>{`${message}`}</h1>
  </header>
);

export default Instruction;

Instruction.propTypes = {
  message: PropTypes.string.isRequired,
};
