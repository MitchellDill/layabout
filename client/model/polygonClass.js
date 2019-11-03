/* eslint-disable linebreak-style */

export default class Polygon {
  constructor(pointsArr, fill = 'black', stroke = 'black', strokeWidth = 2) {
    this.fill = fill;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
    this.pointsArr = pointsArr;
    this.numberOfPoints = pointsArr.length;
  }

  get area() {
    return this.calculateArea(true);
  }

  get style() {
    return this.formatStyleObject();
  }

  static translatePoints(arrOfObjects) {
    // use to turn arr of {x, y} coordinates into a long array that konva and the other methods in this class use
    return arrOfObjects.map((obj) => [obj.x, obj.y]).reduce((prev, curr) => prev.concat(curr[0], curr[1]), []);
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

  calculateArea(hasOrigin) {
    // get coordinates organized into x and y
    const xCoordinates = [];
    const yCoordinates = [];

    // room/polygons have origin, furniture needs one
    if (!hasOrigin) {
      xCoordinates.push(0);
      yCoordinates.push(0);
    }

    for (let i = 0; i < this.pointsArr.length; i++) {
      const coordinate = this.pointsArr[i];
      i % 2 === 0 ? xCoordinates.push(coordinate) : yCoordinates.push(coordinate);
    }

    // add each array to its i + 1 counterpart
    const firstSum = [...xCoordinates].reduce((prev, current, i, arr) => {
      if (i !== arr.length - 1) {
        return prev + (current * yCoordinates[i + 1]);
      }
      return prev + (current * yCoordinates[0]);
    });

    const secondSum = [...yCoordinates].reduce((prev, current, i, arr) => {
      if (i !== arr.length - 1) {
        return prev + (current * xCoordinates[i + 1]);
      }
      return prev + (current * xCoordinates[0]);
    });

    return Math.abs((firstSum - secondSum) / 2);
  }
}
