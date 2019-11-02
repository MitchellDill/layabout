/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */

import React, { Component } from 'react';
import Canvas from './canvas.jsx';
import FurnitureList from './furnitureList.jsx';
import Instruction from './instruction.jsx';
import defaultFurnitureList from '../defaultFurnitureList.js';
import instructionsList from '../instructionsList.js';

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
    this.state.furnitureTypes.includes(name)
      ? this.setState({ selectedFurniture: name })
      : null;
  }

  cycleInstructions() {
    this.setState((prevState, nextState) => ({ instructionIndex: prevState.instructionIndex + 1 }));
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
    } = this.state;
    return (
      <>
        <Instruction message={instructions[instructionIndex]} />
        <div>
          <Canvas height={height} width={width} cycleInstructions={this.cycleInstructions} />
        </div>
        <aside>
          <FurnitureList
            furnitureTypes={furnitureTypes}
            furnitureInstances={furnitureInstances}
            selectedFurniture={selectedFurniture}
            handleClick={this.handleClick}
          />
        </aside>
        <footer>
          <h2>layabout a while, won't you?</h2>
        </footer>
      </>
    );
  }
}
