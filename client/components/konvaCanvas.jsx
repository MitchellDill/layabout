/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */

import React, { Component } from 'react';
import Konva from 'konva';
import {
  Stage, Layer, Rect, Line,
} from 'react-konva';
import PropTypes from 'prop-types';
import styles from '../style/main.less';

export default class KonvaCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width,
      height: this.props.height,
      offsetX: 100,
      offsetY: 100,
      roomCorners: [],
      roomExists: false,
      furnitureList: [],
      furniturePlaced: [],
      placeX: 0,
      placeY: 0,
    };
  }

  handleClick(e) {
    const { offsetX, offsetY } = this.state;
    const clickCoordinates = {
      x: e.evt.clientX - offsetX,
      y: e.evt.clientY - offsetY,
    };
    this.drawCoordinates(clickCoordinates);
  }

  drawCoordinates(coordinates) {
    const { roomCorners, roomExists } = this.state;
    const { cycleInstructions } = this.props;

    if (roomCorners.length < 4 && !roomExists) {
      this.setState((prevState) => {
        const newState = { roomCorners: [...prevState.roomCorners, coordinates] };
        if (newState.roomCorners.length === 4) {
          newState.roomExists = true;
          cycleInstructions();
        }
        return newState;
      });
    }
  }

  render() {
    const {
      width, height, roomCorners, roomExists, furniturePlaced, placeX, placeY,
    } = this.state;
    return (
      <Stage height={height} width={width} className={styles.room} onClick={(e) => { this.handleClick(e); }}>
        <Layer>
          {roomCorners.length > 0 ? roomCorners.map((corner) => <Rect x={corner.x} y={corner.y} width={2} height={2} fill="brown" />) : null}
          {roomExists ? (
            <Line
              points={roomCorners.map((corner) => [corner.x, corner.y]).reduce((prev, current) => {
                console.log(prev);
                return prev.concat(current);
              })}
              closed
              stroke="brown"
            />
          ) : null}
        </Layer>
      </Stage>
    );
  }
}

KonvaCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  cycleInstructions: PropTypes.func.isRequired,
};

KonvaCanvas.defaultProps = {

};
