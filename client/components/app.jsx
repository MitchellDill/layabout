/* eslint-disable linebreak-style */

import React, { Component } from 'react';
import Canvas from './canvas.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 600,
      width: 600,
    };
  }

  render() {
    const { height, width } = this.state;
    return (
      <>
        <header>
          <h1>LAYABOUT MESSAGE</h1>
        </header>
        <div>
          <Canvas height={height} width={width} />
        </div>
        <footer>
          <h2>layabout a while, won't you?</h2>
        </footer>
      </>
    );
  }
}
