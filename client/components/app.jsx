/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */

import React, { Component } from 'react';
import Canvas from './canvas.jsx';
import FurnitureList from './furnitureList.jsx';
import defaultFurnitureList from '../defaultFurnitureList.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 600,
      width: 600,
      furnitureTypes: [],
      furnitureInstances: [],
    };
  }

  componentDidMount() {
    this.getFurnitureList();
  }

  getFurnitureList() {
    this.setState({
      furnitureInstances: defaultFurnitureList,
    });
  }

  render() {
    // eslint-disable-next-line object-curly-newline
    const { height, width, furnitureTypes, furnitureInstances } = this.state;
    return (
      <>
        <header>
          <h1>LAYABOUT MESSAGE</h1>
        </header>
        <div>
          <Canvas height={height} width={width} />
        </div>
        <aside>
          <FurnitureList
            furnitureTypes={furnitureTypes}
            furnitureInstances={furnitureInstances}
          />
        </aside>
        <footer>
          <h2>layabout a while, won't you?</h2>
        </footer>
      </>
    );
  }
}
