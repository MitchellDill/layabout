/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */

import React, { Component } from "react";
import { Button, Card, Paper, Typography } from "@material-ui/core";
import KonvaCanvas from "./konvaCanvas.jsx";
import FurnitureList from "./furnitureList.jsx";
import Instruction from "./instruction.jsx";
import Occupancy from "./occupancy.jsx";
import CreateFurniture from "./createFurniture.jsx";
import {
  postFloorplanToDatabase,
  getFloorplansFromDatabase,
} from "../controller/fetchFloorplans.js";
import defaultFurnitureList from "../model/defaultFurnitureList.js";
import customFurnitureList from "../model/customFurnitureList.js";
import instructionsList from "../model/instructionsList.js";
import style from "../style/main.less";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 500,
      width: 600,
      instructions: instructionsList,
      instructionIndex: 0,
      furnitureTypes: [],
      savedLayout: [],
      savedRoom: [],
      allFloorplans: [],
      selectedTypeOccupancyPercentage: "",
      selectedInstanceOccupancyPercentage: "",
      selectedInstanceIndex: -1,
      selectedInstanceFurnitureType: "",
      selectedFurniture: "",
      furnitureCreateMode: false,
      isErrorShown: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.cycleInstructions = this.cycleInstructions.bind(this);
    this.getFurnitureList = this.getFurnitureList.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.updateRoom = this.updateRoom.bind(this);
    this.updateOccupancyPercentages = this.updateOccupancyPercentages.bind(
      this
    );
    this.saveFloorplan = this.saveFloorplan.bind(this);
  }

  componentDidMount() {
    this.getFurnitureList();
    const result = getFloorplansFromDatabase();
    result.then(res => {
      console.log(res);
      this.storeReceivedFloorplans(res);
    });
  }

  getFurnitureList() {
    this.setState({
      furnitureTypes: defaultFurnitureList.concat(customFurnitureList),
    });
  }

  storeReceivedFloorplans(receivedFloorplans) {
    this.setState({
      allFloorplans: receivedFloorplans,
    });
  }

  selectFurniture(name) {
    const { furnitureTypes, furnitureCreateMode } = this.state;
    if (furnitureTypes.includes(name)) {
      this.setState(prevState => {
        if (prevState.furnitureCreateMode) {
          this.cycleInstructions(-1);
        }
        return {
          selectedFurniture: name,
          furnitureCreateMode: false,
        };
      }, this.getFurnitureList);
    } else if (name === "Draw Custom Furniture" && !furnitureCreateMode) {
      this.setState({ selectedFurniture: "", furnitureCreateMode: true });
      this.cycleInstructions();
    } else if (name === "Finish Drawing" && furnitureCreateMode) {
      this.setState({ furnitureCreateMode: false });
      this.cycleInstructions(-1);
    }
  }

  updateLayout(newX, newY, i, isNewPiece, furnitureType) {
    if (isNewPiece) {
      const newFurniture = { type: furnitureType, x: newX, y: newY };
      this.setState(prevState => ({
        savedLayout: [...prevState.savedLayout, newFurniture],
      }));
    } else {
      this.setState(prevState => {
        const layoutCoordinates = [...prevState.savedLayout];
        const { x, y } = layoutCoordinates[i];
        layoutCoordinates[i].x = x + newX;
        layoutCoordinates[i].y = y + newY;
        return { savedLayout: layoutCoordinates };
      });
    }
  }

  updateRoom(coordinatesAsObjects) {
    console.log(coordinatesAsObjects);
    this.setState(() => ({ savedRoom: coordinatesAsObjects }));
  }

  saveFloorplan() {
    const { savedRoom, savedLayout } = this.state;
    // const arrayOfRoomCoordinates = Polygon.translatePoints(savedRoom);
    const newFloorplan = { roomCoordinates: savedRoom, furniture: savedLayout };
    postFloorplanToDatabase(newFloorplan);
    // showConfirmSave()
  }

  cycleInstructions(code = 1) {
    if (code === 404) {
      this.setState({ isErrorShown: true });
    } else {
      this.setState(prevState => ({
        instructionIndex: prevState.instructionIndex + code,
        isErrorShown: false,
      }));
    }
  }

  showOccupancy(furniture, i) {
    this.setState(() => ({
      selectedInstanceIndex: i,
      selectedInstanceFurnitureType: furniture.type.toLowerCase(),
    }));
  }

  updateOccupancyPercentages(instancePercentage, typePercentage) {
    const formattedInstancePercentage = instancePercentage.toLocaleString(
      "en-US",
      { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 2 }
    );
    const formattedTypePercentage = typePercentage.toLocaleString("en-US", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    });
    this.setState(() => ({
      selectedInstanceOccupancyPercentage: formattedInstancePercentage,
      selectedTypeOccupancyPercentage: formattedTypePercentage,
    }));
  }

  handleClick(e, furnitureObj = null, index = -1) {
    // route click depending on whether instance parameters were passed to it or not
    index >= 0
      ? this.showOccupancy(furnitureObj, index)
      : this.selectFurniture(e.target.innerHTML);
  }

  render() {
    const {
      height,
      width,
      instructions,
      instructionIndex,
      furnitureTypes,
      selectedFurniture,
      furnitureCreateMode,
      isErrorShown,
      selectedInstanceIndex,
      selectedInstanceFurnitureType,
      selectedInstanceOccupancyPercentage,
      selectedTypeOccupancyPercentage,
      allFloorplans,
      savedRoom,
      savedLayout,
    } = this.state;
    return (
      <>
        <header>
          <Instruction
            message={instructions[instructionIndex]}
            isErrorShown={isErrorShown}
            allFloorplans={allFloorplans}
            currentFloorplan={{ savedRoom, savedLayout }}
          />
        </header>
        <div>
          <KonvaCanvas
            height={height}
            width={width}
            cycleInstructions={this.cycleInstructions}
            isCreateButtonOn={furnitureCreateMode}
            selectedFurniture={selectedFurniture}
            updateLayout={this.updateLayout}
            updateRoom={this.updateRoom}
            updateOccupancyPercentages={this.updateOccupancyPercentages}
            occupancyType={selectedInstanceFurnitureType}
            occupancyIndex={selectedInstanceIndex}
            getFurnitureList={this.getFurnitureList}
            handleClick={this.handleClick}
          />
        </div>
        <aside>
          <Paper className={style.cabinet}>
            <FurnitureList
              furnitureTypes={furnitureTypes}
              selectedFurniture={selectedFurniture}
              handleClick={this.handleClick}
              instanceOccupancy={selectedInstanceOccupancyPercentage}
              typeOccupancy={selectedTypeOccupancyPercentage}
            />
            <div>
              <CreateFurniture
                handleClick={this.handleClick}
                selected={furnitureCreateMode}
                cycleInstructions={this.cycleInstructions}
              />

              {instructionIndex > 0 ? (
                <Button onClick={this.saveFloorplan}>
                  <Card className={style.cardStyle}>
                    <Typography variant="h5">Save Floorplan</Typography>
                  </Card>
                </Button>
              ) : null}
            </div>
            {selectedInstanceOccupancyPercentage !== "" ? (
              <Occupancy
                furnitureType={selectedInstanceFurnitureType}
                instanceOccupancy={selectedInstanceOccupancyPercentage}
                typeOccupancy={selectedTypeOccupancyPercentage}
              />
            ) : null}
          </Paper>
        </aside>
        <footer>
          <h2>layabout a while, won't you?</h2>
        </footer>
      </>
    );
  }
}
