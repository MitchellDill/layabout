/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

import React, { Component } from 'react';
import Konva from 'konva';
import {
  Stage, Layer, Rect, Line,
} from 'react-konva';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
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
      customShapeName: '',
      isShapeNameDialogOpen: false,
    };
    this.handleFormField = this.handleFormField.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { occupancyIndex, isCreateButtonOn } = this.props;
    const { furniturePlaced, customShape } = this.state;
    if ((prevProps.occupancyIndex !== occupancyIndex) || (occupancyIndex > 0 && prevState.furniturePlaced.length < furniturePlaced.length)) {
      this.handleOccupancyUpdate();
    }
    if (prevProps.isCreateButtonOn !== isCreateButtonOn && customShape !== null) {
      this.handleOpenDialog();
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
      if (customShape === null) {
        const startNewShape = { type: `custom${furniturePlaced.length}`, coordinates: [coordinates.x, coordinates.y] };
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

  saveCustomFurniture() {
    const { customShape, customShapeName } = this.state;
    const { getFurnitureList } = this.props;
    customShape.type = customShapeName;
    const pointsArr = Polygon.translateInstancePointsIntoClassPoints(customShape.coordinates);
    const customInstance = new Furniture(customShape.type, pointsArr);
    furnitureList.push(customInstance);
    customFurnitureList.push(customShape.type);
    this.wipeCustomCoordinates();
    getFurnitureList();
  }

  handleOccupancyUpdate() {
    const { occupancyIndex } = this.props;
    const { furniturePlaced } = this.state;
    const { type } = furniturePlaced[occupancyIndex];

    // filter for the correctFurnitureObject
    const [furnitureInstance] = furnitureList.filter((f) => f.type === type);
    // determine how many of this type are currently in the room
    const furnitureCount = furniturePlaced.filter((f) => f.type === type).length;
    // invoke calculation function
    this.calculateOccupancy(furnitureInstance, furnitureCount);
  }

  calculateOccupancy(furnitureInstance, furnitureCount) {
    const { updateOccupancyPercentages } = this.props;
    const { room } = this.state;
    const spaceOccupiedByOne = room.calculateAreaOccupiedByAnotherPolygon(furnitureInstance);
    const spaceOccupiedByAll = spaceOccupiedByOne * furnitureCount;
    updateOccupancyPercentages(spaceOccupiedByOne, spaceOccupiedByAll);
  }

  wipeCustomCoordinates() {
    this.setState(() => ({ customShape: null }));
  }

  handleOpenDialog() {
    this.setState(() => ({ isShapeNameDialogOpen: true }));
  }

  handleCloseDialog(callback = () => {}) {
    this.setState(() => ({ isShapeNameDialogOpen: false }), callback);
  }

  handleFormField(e) {
    const { value } = e.target;
    this.setState(() => ({ customShapeName: value }));
  }

  render() {
    const {
      roomCorners, roomExists, furniturePlaced, customShape, isShapeNameDialogOpen,
    } = this.state;
    const {
      width, height, updateLayout, handleClick, isCreateButtonOn,
    } = this.props;
    return (
      <div>
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
                return (
                  <Line points={points} closed stroke="green" key={`sketching${i + 1}`} />
                );
              }
            })
              : null}
          </Layer>
        </Stage>
        <Dialog open={isShapeNameDialogOpen} onClose={this.handleCloseDialog} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Name your design</DialogTitle>
          <DialogContent>
            <DialogContentText>
              What did ya make, friend?
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="name"
              type="name"
              onChange={this.handleFormField}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  this.handleCloseDialog(this.saveCustomFurniture);
                }
              }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.handleCloseDialog(this.wipeCustomCoordinates);
              }}
              color="secondary"
            >
            Cancel
            </Button>
            <Button
              onClick={() => {
                this.handleCloseDialog(this.saveCustomFurniture);
              }}
              color="primary"
            >
            Save Design
            </Button>
          </DialogActions>
        </Dialog>
      </div>
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
  getFurnitureList: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  updateOccupancyPercentages: PropTypes.func.isRequired,
};

KonvaCanvas.defaultProps = {
  selectedFurniture: '',
};
