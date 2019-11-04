/* eslint-disable linebreak-style */

import Furniture from './furnitureClass.js';
import defaultFurnitureList from './defaultFurnitureList.js';
import {
  chair, table, couch, tv, cabinet,
} from './furnitureBuildCoordinates.js';

const square = new Furniture(defaultFurnitureList[0], chair, 'brown');
const rectangle = new Furniture(defaultFurnitureList[1], table, 'red', 'white', 3);
const rectangle2 = new Furniture(defaultFurnitureList[2], couch, 'blue');
const polygon1 = new Furniture(defaultFurnitureList[3], tv);
const polygon2 = new Furniture(defaultFurnitureList[4], cabinet, 'yellow', 'brown', 1);

const furnitureList = [square, rectangle, rectangle2, polygon1, polygon2];

export default furnitureList;
