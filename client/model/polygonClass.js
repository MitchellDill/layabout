/* eslint-disable linebreak-style */

export default class Polygon {
  constructor(pointsArr, fill = 'black', stroke = 'black', strokeWidth = 2) {
    this.fill = fill;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
    this.pointsArr = pointsArr;
    this.numberOfPoints = pointsArr.length / 2;
  }

  get area() {
    return this.calculateArea();
  }

  get style() {
    return this.formatStyleObject();
  }

  formatStyleObject() {
    const styleObject = {
      fill: this.fill,
      stroke: this.stroke,
      strokeWidth: this.strokeWidth,
    };
    return styleObject;
  }

  createPoints(x, y) {
    const instancePoints = [x, y];
    for (let i = 0; i < this.pointsArr.length; i++) {
      const aproposAxis = i % 2 === 0 ? x : y;
      instancePoints.push(this.pointsArr[i] + aproposAxis);
    }
    return instancePoints;
  }


  calculateArea() {
    // get coordinates organized into x and y
    const xCoordinates = [0];
    const yCoordinates = [0];
    for (let i = 0; i < this.pointsArr.length; i++) {
      const coordinate = this.pointsArr[i];
      i % 2 === 0 ? xCoordinates.push(coordinate) : yCoordinates.push(coordinate);
    }
    xCoordinates.push(0);
    yCoordinates.push(0);

    // add each array to its i + 1 counterpart
    const firstSum = [...xCoordinates].reduce((prev, current, i, arr) => {
      if (i !== arr.length - 1) {
        return prev + (current * yCoordinates[i + 1]);
      }
      return prev;
    });

    const secondSum = [...yCoordinates].reduce((prev, current, i, arr) => {
      if (i !== arr.length - 1) {
        return prev + (current * xCoordinates[i + 1]);
      }
      return prev;
    });

    return (firstSum - secondSum) / 2;
  }
}
