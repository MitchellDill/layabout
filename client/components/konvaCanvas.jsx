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
import Polygon from '../model/polygonClass.js';
import isPointInPolygon from '../model/mathHelpers.js';
import styles from '../style/main.less';
import furnitureList from '../model/furnitureList.js';

export default class KonvaCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width,
      height: this.props.height,
      offsetX: 100,
      offsetY: 100,
      roomCorners: [],
      roomArea: 0,
      roomExists: false,
      furniturePlaced: [],
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

  createRoom() {
    this.setState((prevState) => {
      const pointsArr = Polygon.translatePoints(prevState.roomCorners);
      const room = new Polygon(pointsArr);
      return {
        roomExists: true,
        roomArea: room.area,
      };
    });
  }

  drawCoordinates(coordinates) {
    const { roomCorners, roomExists } = this.state;
    const { cycleInstructions, selectedFurniture, updateLayout } = this.props;

    if (roomCorners.length < 4 && !roomExists) {
      this.setState((prevState) => {
        const newState = { roomCorners: [...prevState.roomCorners, coordinates] };
        if (newState.roomCorners.length === 4) {
          this.createRoom();
          cycleInstructions();
        }
        return newState;
      });
    } else if (roomExists && selectedFurniture !== '') {
      const newFurniture = { type: selectedFurniture, x: coordinates.x, y: coordinates.y };
      let furnitureCount;
      this.setState((prevState) => {
        furnitureCount = prevState.furniturePlaced.length;
        return {
          furniturePlaced: [...prevState.furniturePlaced, newFurniture],
        };
      });
      updateLayout(coordinates.x, coordinates.y, furnitureCount, true, selectedFurniture);
    }
  }

  render() {
    const {
      width, height, roomCorners, roomExists, furniturePlaced,
    } = this.state;
    const { updateLayout } = this.props;
    return (
      <Stage height={height} width={width} className={styles.room} onClick={(e) => { this.handleClick(e); }}>
        <Layer>
          {roomCorners.length > 0 ? roomCorners.map((corner, i) => <Rect x={corner.x} y={corner.y} width={2} height={2} fill="brown" key={`roomCorner${roomCorners.length}index${i}`} />) : null}
          {roomExists ? (
            <Line
              points={roomCorners.map((corner) => [corner.x, corner.y]).reduce((prev, current) => prev.concat(current))}
              closed
              stroke="black"
            />
          ) : null}
          {roomExists && furniturePlaced.length > 0 ? (
            furniturePlaced.map((furniture, i) => <FurnitureBrush type={furniture.type} x={furniture.x} y={furniture.y} index={i} updateLayout={updateLayout} key={`furniturePiece${i}`} />)
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
  updateLayout: PropTypes.func.isRequired,
  selectedFurniture: PropTypes.string,
};

KonvaCanvas.defaultProps = {
  selectedFurniture: '',
};
