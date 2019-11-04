/* eslint-disable linebreak-style */

import Polygon from './polygonClass.js';

export default class Furniture extends Polygon {
  constructor(type, pointsArr, fill, stroke, strokeWidth) {
    super(pointsArr, fill, stroke, strokeWidth);
    this.type = type;
  }

  get area() {
    return this.calculateArea(false);
  }

  isPointInFurniture(point, furnitureOriginX, furnitureOriginY) {
    const allFurniturePoints = this.createPoints(furnitureOriginX, furnitureOriginY);
    const formattedPoints = [];

    for (let i = 0; i < allFurniturePoints.length; i += 2) {
      formattedPoints.push({ x: allFurniturePoints[i], y: allFurniturePoints[i + 1] });
    }

    return Polygon.isPointInPolygon(point, formattedPoints);
  }

  isFurnitureInPolygon(polygonCorners, originX, originY) {
    const allFurniturePoints = this.createPoints(originX, originY);
    const formattedPoints = [];

    for (let i = 0; i < allFurniturePoints.length; i += 2) {
      formattedPoints.push({ x: allFurniturePoints[i], y: allFurniturePoints[i + 1] });
    }

    return formattedPoints.every((point) => Polygon.isPointInPolygon(point, polygonCorners));
  }
}
