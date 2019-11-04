/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */

import React, { Component } from 'react';
import KonvaCanvas from './konvaCanvas.jsx';
import FurnitureList from './furnitureList.jsx';
import Instruction from './instruction.jsx';
import defaultFurnitureList from '../defaultFurnitureList.js';
import instructionsList from '../instructionsList.js';
import CreateFurniture from './createFurniture.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 600,
      width: 600,
      instructions: instructionsList,
      instructionIndex: 0,
      furnitureTypes: [],
      savedLayout: [],
      savedRoom: [],
      furnitureTypeOccupancyPercentages: [],
      selectedInstanceOccupancyPercentage: 0,
      selectedInstanceIndex: 0,
      selectedFurniture: '',
      furnitureCreateMode: false,
      isErrorShown: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.cycleInstructions = this.cycleInstructions.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.updateRoom = this.updateRoom.bind(this);
    this.showOccupancy = this.showOccupancy.bind(this);
  }

  componentDidMount() {
    this.getFurnitureList();
  }

  getFurnitureList() {
    this.setState({
      furnitureTypes: defaultFurnitureList,
    });
  }

  selectFurniture(name) {
    const { furnitureTypes } = this.state;
    if (furnitureTypes.includes(name)) {
      this.setState((prevState) => {
        if (prevState.furnitureCreateMode) {
          this.cycleInstructions(-1);
        }
        return {
          selectedFurniture: name,
          furnitureCreateMode: false,
        };
      });
    } else if (name === 'Draw custom furniture') {
      this.setState({ selectedFurniture: '', furnitureCreateMode: true });
      this.cycleInstructions();
    }
  }

  updateLayout(newX, newY, i, isNewPiece, furnitureType) {
    if (isNewPiece) {
      const newFurniture = { type: furnitureType, x: newX, y: newY };
      this.setState((prevState) => ({
        savedLayout: [...prevState.savedLayout, newFurniture],
      }));
    } else {
      this.setState((prevState) => {
        const layoutCoordinates = [...prevState.savedLayout];
        const { x, y } = layoutCoordinates[i];
        layoutCoordinates[i].x = x + newX;
        layoutCoordinates[i].y = y + newY;
        return { savedLayout: layoutCoordinates };
      });
    }
  }

  updateRoom(coordinatesAsObjects) {
    this.setState(() => ({ savedRoom: coordinatesAsObjects }));
  }

  cycleInstructions(code = 1) {
    if (code === 404) {
      this.setState({ isErrorShown: true });
    } else {
      this.setState((prevState) => ({
        instructionIndex: prevState.instructionIndex + code,
        isErrorShown: false,
      }));
    }
  }

  showOccupancy(e, i) {

  }

  handleClick(e) {
    this.selectFurniture(e.target.innerHTML);
  }

  render() {
    const {
      height,
      width,
      instructions,
      instructionIndex,
      furnitureTypes,
      selectedFurniture,
      furnitureCreateMode,
      isErrorShown,
    } = this.state;
    return (
      <>
        <Instruction
          message={instructions[instructionIndex]}
          isErrorShown={isErrorShown}
        />
        <div>
          <KonvaCanvas
            height={height}
            width={width}
            cycleInstructions={this.cycleInstructions}
            isCreateButtonOn={furnitureCreateMode}
            selectedFurniture={selectedFurniture}
            updateLayout={this.updateLayout}
            updateRoom={this.updateRoom}
          />
        </div>
        <aside>
          <FurnitureList
            furnitureTypes={furnitureTypes}
            selectedFurniture={selectedFurniture}
            handleClick={this.handleClick}
          />
          <CreateFurniture
            handleClick={this.handleClick}
            selected={furnitureCreateMode}
            cycleInstructions={this.cycleInstructions}
          />
        </aside>
        <footer>
          <h2>layabout a while, won't you?</h2>
        </footer>
      </>
    );
  }
}
