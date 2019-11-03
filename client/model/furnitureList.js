/* eslint-disable linebreak-style */

import Furniture from './furnitureClass.js';
import defaultFurnitureList from '../defaultFurnitureList.js';

const square = new Furniture(defaultFurnitureList[0], [18, 0, 18, 18, 0, 18], 'brown');
const rectangle = new Furniture(defaultFurnitureList[1], [30, 0, 30, 72, 0, 72], 'red', 'white', 3);
const rectangle2 = new Furniture(defaultFurnitureList[2], [75, 0, 75, 35, 68, 35, 68, 30, 7, 30, 7, 35, 0, 35], 'blue');
const polygon1 = new Furniture(defaultFurnitureList[3], [34, 0, 34, 5, 31, 6, 3, 6, 0, 5]);
const polygon2 = new Furniture(defaultFurnitureList[4], [40, 0, 40, 18, 0, 18], 'yellow', 'brown', 1);

const furnitureList = [square, rectangle, rectangle2, polygon1, polygon2];

export default furnitureList;
