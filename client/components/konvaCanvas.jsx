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
import Furniture from '../model/furnitureClass.js';
import styles from '../style/main.less';
import furnitureList from '../model/furnitureObjectList.js';
import customFurnitureList from '../model/customFurnitureList.js';

export default class KonvaCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offsetX: 100,
      offsetY: 100,
      roomCorners: [],
      roomArea: 0,
      room: null,
      roomExists: false,
      furniturePlaced: [],
      customShape: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { occupancyIndex, findOccupancyPercentages, isCreateButtonOn } = this.props;
    const { room, furniturePlaced, customShape } = this.state;
    if ((prevProps.occupancyIndex !== occupancyIndex) || (occupancyIndex > 0 && prevState.furniturePlaced.length < furniturePlaced.length)) {
      const { type } = furniturePlaced[occupancyIndex];
      const [furnitureInstance] = furnitureList.filter((f) => f.type === type);
      const furnitureCount = furniturePlaced.filter((f) => f.type === type).length;
      const spaceOccupiedByOne = room.calculateAreaOccupiedByAnotherPolygon(furnitureInstance);
      const spaceOccupiedByAll = spaceOccupiedByOne * furnitureCount;
      findOccupancyPercentages(spaceOccupiedByOne, spaceOccupiedByAll);
    }
    if (prevProps.isCreateButtonOn !== isCreateButtonOn && customShape !== null) {
      const pointsArr = Polygon.translateInstancePointsIntoClassPoints(customShape.coordinates);
      const customInstance = new Furniture(customShape.type, pointsArr);
      furnitureList.push(customInstance);
      customFurnitureList.push(customShape.type);
      console.log(customFurnitureList);
      this.wipeCustomCoordinates();
    }
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
    const { updateRoom } = this.props;
    this.setState((prevState) => {
      const pointsArr = Polygon.translatePoints(prevState.roomCorners);
      const room = new Polygon(pointsArr);
      return {
        roomExists: true,
        roomArea: room.area,
        room,
      };
    }, updateRoom(this.state.roomCorners));
  }

  drawCoordinates(coordinates) {
    const {
      roomCorners, roomExists, furniturePlaced, isCreateButtonOn, customShape,
    } = this.state;
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
      if (this.checkLegalityOfPoint(coordinates)) {
        let furnitureCount;
        this.setState((prevState) => {
          furnitureCount = prevState.furniturePlaced.length;
          return {
            furniturePlaced: [...prevState.furniturePlaced, newFurniture],
          };
        }, updateLayout(coordinates.x, coordinates.y, furnitureCount, true, selectedFurniture));
      } else {
        cycleInstructions(404);
      }
    } else if (roomExists && selectedFurniture === '') {
      console.log(coordinates);
      if (customShape === null) {
        const startNewShape = { type: `custom${furniturePlaced.length + Math.floor(Math.random() * 500)}`, coordinates: [coordinates.x, coordinates.y] };
        this.setState(() => ({ customShape: startNewShape }));
      } else {
        this.setState((prevState) => {
          const newShape = { ...prevState.customShape };
          newShape.coordinates = [...prevState.customShape.coordinates, coordinates.x, coordinates.y];
          return { customShape: newShape };
        });
      }
    }
  }

  checkLegalityOfPoint(coordinates) {
    const { roomCorners, furniturePlaced } = this.state;
    const { selectedFurniture } = this.props;
    const [furnitureBeingPlaced] = furnitureList.filter((furniture) => furniture.type === selectedFurniture);
    const furnitureIsWithinBounds = furnitureBeingPlaced.isFurnitureInPolygon(roomCorners, coordinates.x, coordinates.y);
    const pointIsWithinFurniture = furniturePlaced.length === 0 ? false : furniturePlaced.some((furniture) => {
      const [filteredFurniture] = furnitureList.filter((f) => f.type === furniture.type);
      return filteredFurniture.isPointInFurniture(coordinates, furniture.x, furniture.y);
    });
    if (furnitureIsWithinBounds && !pointIsWithinFurniture) {
      return true;
    }
    return false;
  }

  wipeCustomCoordinates() {
    this.setState(() => ({ customShape: null }));
  }

  render() {
    const {
      roomCorners, roomExists, furniturePlaced, customShape, offsetX, offsetY,
    } = this.state;
    const {
      width, height, updateLayout, handleClick, isCreateButtonOn,
    } = this.props;
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
            furniturePlaced.map((furniture, i) => <FurnitureBrush type={furniture.type} x={furniture.x} y={furniture.y} index={i} updateLayout={updateLayout} handleClick={handleClick} key={`furniturePiece${i}`} />)
          ) : null}
          {isCreateButtonOn && customShape !== null && customShape.coordinates.length > 1 ? customShape.coordinates.map((point, i, arr) => {
            if (i !== arr.length - 1 && i % 2 === 0) {
              const points = [arr[i - 2], arr[i - 1], point, arr[i + 1]];
              console.log(points);
              return (
                <Line points={points} closed stroke="black" key={`heya${i}`} />
              );
          })
            : null}
        </Layer>
      </Stage>
    );
  }
}

KonvaCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  selectedFurniture: PropTypes.string,
  occupancyIndex: PropTypes.number.isRequired,
  isCreateButtonOn: PropTypes.bool.isRequired,
  cycleInstructions: PropTypes.func.isRequired,
  updateLayout: PropTypes.func.isRequired,
  updateRoom: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  findOccupancyPercentages: PropTypes.func.isRequired,
};

KonvaCanvas.defaultProps = {
  selectedFurniture: '',
};
