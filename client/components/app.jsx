/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */

import React, { Component } from 'react';
import Canvas from './canvas.jsx';
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
      furnitureInstances: [],
      selectedFurniture: '',
      furnitureCreateMode: false,
      isErrorShown: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.cycleInstructions = this.cycleInstructions.bind(this);
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
      this.setState((prevState, nextState) => {
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

  cycleInstructions(code = 1) {
    if (code === 404) {
      this.setState({ isErrorShown: true });
    } else {
      this.setState((prevState, nextState) => ({
        instructionIndex: prevState.instructionIndex + code,
        isErrorShown: false,
      }));
    }
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
      furnitureInstances,
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
          />
        </div>
        <aside>
          <FurnitureList
            furnitureTypes={furnitureTypes}
            furnitureInstances={furnitureInstances}
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
