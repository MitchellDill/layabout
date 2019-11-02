/* eslint-disable linebreak-style */

class furniture {
  constructor(lineWidth, brushShape, pointsArr) {
    // pointsArr contains objs with x and y
    this.lineWidth = lineWidth,
    this.brushShape = brushShape,
    this.pointsArr = pointsArr,
    this.numberOfPoints = pointsArr.length;
  }

  drawShape() {
    // write function which will draw out the appropriate shape when invoked
  }
}
