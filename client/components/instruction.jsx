/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {
  AppBar, Toolbar, IconButton, Button, Menu, MenuItem,
} from '@material-ui/core';
import style from '../style/main.less';

const Instruction = ({ message, isErrorShown, allFloorplans }) => {
  const messageDisplayed = isErrorShown ? 'Error! You either need a room, or you need a bigger room.' : message;
  const [anchorEl, setAnchorEl] = React.useState(null);
  console.log(allFloorplans);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" className={style.header}>
        <Toolbar>
          <IconButton className={style.header} aria-label="menu" onClick={handleClick}>
           | My Saved Floorplans |
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {allFloorplans.map((floorplan, i) => (
              <MenuItem onClick={handleClose}>
                {`Floorplan${i + 1}`}
              </MenuItem>
            ))}
          </Menu>

          <Typography variant="h6">{`${messageDisplayed}`}</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Instruction;

Instruction.propTypes = {
  allFloorplans: PropTypes.array,
  message: PropTypes.string.isRequired,
  isErrorShown: PropTypes.bool.isRequired,
};

Instruction.defaultProps = {
  allFloorplans: [],
};
