/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

import React, { Component } from 'react';
import Konva from 'konva';
import {
  Stage, Layer, Rect, Line,
} from 'react-konva';
import PropTypes from 'prop-types';
import FurnitureBrush from './furnitureBrush.jsx';
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
      selectedFurniture: this.props.selectedFurniture,
      placeX: 0,
      placeY: 0,
      isDragging: false,
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
    const { roomCorners, roomExists, selectedFurniture } = this.state;
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
    } else if (roomExists) {
      console.log(selectedFurniture);
      const newFurniture = { type: selectedFurniture, x: coordinates.x, y: coordinates.y };
      this.setState((prevState) => ({ furniturePlaced: [...prevState.furniturePlaced, newFurniture] }));
    }
  }

  render() {
    const {
      width, height, roomCorners, roomExists, furniturePlaced,
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
              stroke="black"
            />
          ) : null}
          {roomExists && furniturePlaced.length > 0 ? (
            furniturePlaced.map((furniture) => <FurnitureBrush type={furniture.type} x={furniture.x} y={furniture.y} />)
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
  selectedFurniture: PropTypes.string,
};

KonvaCanvas.defaultProps = {

};
