/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */

import React, { Component } from 'react';
import KonvaCanvas from './konvaCanvas.jsx';
import FurnitureList from './furnitureList.jsx';
import Instruction from './instruction.jsx';
import Occupancy from './occupancy.jsx';
import CreateFurniture from './createFurniture.jsx';
import defaultFurnitureList from '../model/defaultFurnitureList.js';
import customFurnitureList from '../model/customFurnitureList.js';
import instructionsList from '../model/instructionsList.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 800,
      width: 700,
      instructions: instructionsList,
      instructionIndex: 0,
      furnitureTypes: [],
      savedLayout: [],
      savedRoom: [],
      selectedTypeOccupancyPercentage: '',
      selectedInstanceOccupancyPercentage: '',
      selectedInstanceIndex: -1,
      selectedInstanceFurnitureType: '',
      selectedFurniture: '',
      furnitureCreateMode: false,
      isErrorShown: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.cycleInstructions = this.cycleInstructions.bind(this);
    this.getFurnitureList = this.getFurnitureList.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.updateRoom = this.updateRoom.bind(this);
    this.updateOccupancyPercentages = this.updateOccupancyPercentages.bind(this);
  }

  componentDidMount() {
    this.getFurnitureList();
  }

  getFurnitureList() {
    this.setState({
      furnitureTypes: defaultFurnitureList.concat(customFurnitureList),
    });
  }

  selectFurniture(name) {
    const { furnitureTypes, furnitureCreateMode } = this.state;
    if (furnitureTypes.includes(name)) {
      this.setState((prevState) => {
        if (prevState.furnitureCreateMode) {
          this.cycleInstructions(-1);
        }
        return {
          selectedFurniture: name,
          furnitureCreateMode: false,
        };
      }, this.getFurnitureList);
    } else if (name === 'Draw Custom Furniture' && !furnitureCreateMode) {
      this.setState({ selectedFurniture: '', furnitureCreateMode: true });
      this.cycleInstructions();
    } else if (name === 'Finish Drawing' && furnitureCreateMode) {
      this.setState({ furnitureCreateMode: false });
      this.cycleInstructions(-1);
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

  showOccupancy(furniture, i) {
    this.setState(() => ({ selectedInstanceIndex: i, selectedInstanceFurnitureType: furniture.type.toLowerCase() }));
  }

  updateOccupancyPercentages(instancePercentage, typePercentage) {
    const formattedInstancePercentage = instancePercentage.toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 2 });
    const formattedTypePercentage = typePercentage.toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 2 });
    this.setState(() => ({ selectedInstanceOccupancyPercentage: formattedInstancePercentage, selectedTypeOccupancyPercentage: formattedTypePercentage }));
  }

  handleClick(e, furnitureObj = null, index = -1) {
    // route click depending on whether instance parameters were passed to it or not
    index >= 0 ? this.showOccupancy(furnitureObj, index) : this.selectFurniture(e.target.innerHTML);
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
      selectedInstanceIndex,
      selectedInstanceFurnitureType,
      selectedInstanceOccupancyPercentage,
      selectedTypeOccupancyPercentage,
    } = this.state;
    return (
      <>
        <header>
          <Instruction
            message={instructions[instructionIndex]}
            isErrorShown={isErrorShown}
          />
        </header>
        <div>
          <KonvaCanvas
            height={height}
            width={width}
            cycleInstructions={this.cycleInstructions}
            isCreateButtonOn={furnitureCreateMode}
            selectedFurniture={selectedFurniture}
            updateLayout={this.updateLayout}
            updateRoom={this.updateRoom}
            updateOccupancyPercentages={this.updateOccupancyPercentages}
            occupancyType={selectedInstanceFurnitureType}
            occupancyIndex={selectedInstanceIndex}
            getFurnitureList={this.getFurnitureList}
            handleClick={this.handleClick}
          />
        </div>
        <aside>
          <FurnitureList
            furnitureTypes={furnitureTypes}
            selectedFurniture={selectedFurniture}
            handleClick={this.handleClick}
            instanceOccupancy={selectedInstanceOccupancyPercentage}
            typeOccupancy={selectedTypeOccupancyPercentage}
          />
          <CreateFurniture
            handleClick={this.handleClick}
            selected={furnitureCreateMode}
            cycleInstructions={this.cycleInstructions}
          />
          {selectedInstanceOccupancyPercentage !== ''
            ? (
              <Occupancy
                furnitureType={selectedInstanceFurnitureType}
                instanceOccupancy={selectedInstanceOccupancyPercentage}
                typeOccupancy={selectedTypeOccupancyPercentage}
              />
            )
            : null}
        </aside>
        <footer>
          <h2>layabout a while, won't you?</h2>
        </footer>
      </>
    );
  }
}
