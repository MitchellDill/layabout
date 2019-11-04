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
    return this.calculateArea(true);
  }

  get style() {
    return this.formatStyleObject();
  }

  static translatePoints(arrOfObjects) {
    // use to turn arr of {x, y} coordinates into a long array that konva and the other methods in this class use
    return arrOfObjects.map((obj) => [obj.x, obj.y]).reduce((prev, curr) => prev.concat(curr[0], curr[1]), []);
  }

  static isPointInPolygon(p, polygon) {
    let isInside = false;
    let minX = polygon[0].x;
    let maxX = polygon[0].x;
    let minY = polygon[0].y;
    let maxY = polygon[0].y;
    for (let n = 1; n < polygon.length; n++) {
      const q = polygon[n];
      minX = Math.min(q.x, minX);
      maxX = Math.max(q.x, maxX);
      minY = Math.min(q.y, minY);
      maxY = Math.max(q.y, maxY);
    }

    if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
      return false;
    }

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      if ((polygon[i].y > p.y) !== (polygon[j].y > p.y)
                  && p.x < (polygon[j].x - polygon[i].x) * (p.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x) {
        isInside = !isInside;
      }
    }

    return isInside;
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

  calculateAreaOccupiedByAnotherPolygon(otherPolygon) {
    return otherPolygon.area / this.area;
  }
}
