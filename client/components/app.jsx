/* eslint-disable linebreak-style */

import React, { Component } from 'react';
import Canvas from './canvas.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 800,
      width: 800,
    };
    this.handleClick = this.handleClick.bind(this);
    this.draw = this.draw.bind(this);
  }

  getCanvasContext(canvasRef) {
    const context = canvasRef.getContext('2d');
    this.draw();
  }

  handleClick(e, ref) {
    const { current } = ref;
    const { id } = current;
    id === 'roomCanvas'
      ? this.getCanvasContext(current)
      : console.log('not a canvas');
  }

  draw() {
    console.log('drawin here');
  }

  render() {
    const { height, width } = this.state;
    return (
      <>
        <header>
          <h1>HERE WE GO BABY</h1>
        </header>
        <div>
          <Canvas
            height={height}
            width={width}
            handleClick={this.handleClick}
          />
        </div>
        <footer>
          <h2>layabout a while, won't you?</h2>
        </footer>
      </>
    );
  }
}
