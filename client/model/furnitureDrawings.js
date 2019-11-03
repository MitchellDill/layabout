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
}

const square = new Furniture('Chair', [25, 0, 25, 25, 0, 25], 'brown');
const rectangle = new Furniture('Table', [25, 0, 25, 75, 0, 75], 'red', 'white', 3);
const rectangle2 = new Furniture('Couch', [80, 0, 80, 35, 0, 35], 'blue');
const polygon1 = new Furniture('TV', [13, 11, 40, 40, 60, 11]);
const polygon2 = new Furniture('Cabinet', [60, 11, 6, 40, 60, 70]);

const furnitureList = [square, rectangle, rectangle2, polygon1, polygon2];

export default furnitureList;
