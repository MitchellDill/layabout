/* eslint-disable linebreak-style */

import Polygon from './polygonClass.js';

export default class Furniture extends Polygon {
  constructor(type, pointsArr, fill, stroke, strokeWidth) {
    super(pointsArr, fill, stroke, strokeWidth);
    this.type = type;
  }
}
