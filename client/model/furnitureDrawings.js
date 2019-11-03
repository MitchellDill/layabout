/* eslint-disable linebreak-style */

class Furniture {
  constructor(pointsArr, lineWidth = 2, fill = true) {
    this.lineWidth = lineWidth,
    this.fill = fill,
    this.pointsArr = pointsArr,
    this.numberOfPoints = pointsArr.length / 2;
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

const square = new Furniture([25, 0, 25, 25, 0, 25]);

const furnitureList = [square];

export default furnitureList;
