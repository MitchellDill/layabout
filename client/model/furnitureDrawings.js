/* eslint-disable linebreak-style */

class Furniture {
  constructor(type, pointsArr, fill = 'black', stroke = 'black', strokeWidth = 2) {
    this.type = type,
    this.fill = fill,
    this.stroke = stroke,
    this.strokeWidth = strokeWidth,
    this.pointsArr = pointsArr,
    this.numberOfPoints = pointsArr.length / 2;
  }

  getStyle() {
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

  getArea() {
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

const square = new Furniture('Chair', [18, 0, 18, 18, 0, 18], 'brown');
const rectangle = new Furniture('Table', [30, 0, 30, 72, 0, 72], 'red', 'white', 3);
const rectangle2 = new Furniture('Couch', [75, 0, 75, 35, 68, 35, 68, 30, 7, 30, 7, 35, 0, 35], 'blue');
const polygon1 = new Furniture('TV', [34, 0, 34, 5, 31, 6, 3, 6, 0, 5]);
const polygon2 = new Furniture('Cabinet', [40, 0, 40, 18, 0, 18], 'yellow', 'brown', 1);

const furnitureList = [square, rectangle, rectangle2, polygon1, polygon2];

export default furnitureList;
