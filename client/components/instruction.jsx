/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {
  AppBar, Toolbar, IconButton, Button,
} from '@material-ui/core';
import style from '../style/main.less';

const Instruction = ({ message, isErrorShown }) => {
  const messageDisplayed = isErrorShown ? 'Error! You either need a room, or you need a bigger room.' : message;
  return (
    <>
      <AppBar position="static" className={style.header}>
        <Toolbar>
          <IconButton className={style.header} aria-label="menu">
            Your Floorplans
          </IconButton>

          <Typography variant="h6">{`${messageDisplayed}`}</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Instruction;

Instruction.propTypes = {
  message: PropTypes.string.isRequired,
  isErrorShown: PropTypes.bool.isRequired,
};
