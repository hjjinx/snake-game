import React, { Component } from "react";
import Grid from "./Grid";

class Main extends Component {
  constructor() {
    super();
    this.rows = 17;
    this.cols = 17;
    this.state = {
      GridArr: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill("")),
      dir: "L",
      length: 3,
      headX: 8,
      headY: 8,
      history: ["8_8", "8_9", "8_10"],
      food: "",
      foodEaten: false
    };
  }

  newGame = () => {
    clearInterval(this.intervalId);
    this.setState({ headY: 8, headX: 8 });
    let newArr = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(""));
    newArr[8][8] = "SH";
    newArr[8][8 + 1] = "S";
    newArr[8][8 + 2] = "S";
    this.setState({
      GridArr: newArr,
      history: ["8_8", "8_9", "8_10"],
      length: 3,
      dir: "L",
      headX: 8,
      headY: 8,
      foodEaten: false
    });
    this.spawnFood(newArr);
    this.play();
  };

  playing = () => {
    const dir = this.state.dir;
    const headX = this.state.headX;
    const headY = this.state.headY;
    let newArr = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(""));
    const foodArr = this.state.food.split("_");
    newArr[foodArr[0]][foodArr[1]] = "F";
    let gridClone = arrayClone(this.state.GridArr);
    var history = arrayClone(this.state.history);
    if (dir === "L") {
      if (gridClone[headX][headY - 1] === "F") {
        this.setState({ length: this.state.length + 1, foodEaten: true });
      } else if (gridClone[headX][headY - 1] === "S") {
        this.newGame();
        return 0;
      }
      newArr[headX][headY - 1] = "SH";
      var newPos = JSON.stringify(headX) + "_" + JSON.stringify(headY - 1);
      this.setState({ headY: headY - 1 });
    } else if (dir === "U") {
      if (gridClone[headX - 1][headY] === "F") {
        this.setState({ length: this.state.length + 1, foodEaten: true });
      } else if (gridClone[headX - 1][headY] === "S") {
        this.newGame();
        return 0;
      }
      newArr[headX - 1][headY] = "SH";
      var newPos = JSON.stringify(headX - 1) + "_" + JSON.stringify(headY);
      this.setState({ headX: headX - 1 });
    } else if (dir === "R") {
      if (gridClone[headX][headY + 1] === "F") {
        this.setState({ length: this.state.length + 1, foodEaten: true });
      } else if (gridClone[headX][headY + 1] === "S") {
        this.newGame();
        return 0;
      }
      newArr[headX][headY + 1] = "SH";
      var newPos = JSON.stringify(headX) + "_" + JSON.stringify(headY + 1);
      this.setState({ headY: headY + 1 });
    } else if (dir === "D") {
      if (gridClone[headX + 1][headY] === "F") {
        this.setState({ length: this.state.length + 1, foodEaten: true });
      } else if (gridClone[headX + 1][headY] === "S") {
        this.newGame();
        return 0;
      }
      newArr[headX + 1][headY] = "SH";
      var newPos = JSON.stringify(headX + 1) + "_" + JSON.stringify(headY);
      this.setState({ headX: headX + 1 });
    }

    var newHistory = [newPos];

    for (let j = 0; j < history.length - 1; j++) {
      if (j === history.length - 2 && this.state.foodEaten === true) {
        this.spawnFood(gridClone);
        newHistory.push(history[j - 1]);
      }
      newHistory.push(history[j]);
      let XY = newHistory[j + 1].split("_");
      newArr[XY[0]][XY[1]] = "S";
    }
    console.log(history);
    console.log(newHistory);
    this.setState({ GridArr: newArr, history: newHistory });
  };

  spawnFood = arr => {
    var foodX = Math.floor(Math.random() * 17);
    var foodY = Math.floor(Math.random() * 17);
    let food = JSON.stringify(foodX) + "_" + JSON.stringify(foodY);

    if (arr[foodX][foodY] !== "") this.spawnFood();
    else {
      arr[foodX][foodY] = "F";
      this.setState({ food: food });
    }
    this.setState({ GridArr: arr, foodEaten: false });
  };

  play = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.playing, 200);
  };

  pause = () => {
    clearInterval(this.intervalId);
  };

  componentDidMount() {
    this.newGame();
    window.addEventListener("keydown", e => {
      let dir = this.state.dir;
      if (e.keyCode === 37) {
        //37 is left arrow
        if (dir === "R") {
        } else this.setState({ dir: "L" });
      }
      if (e.keyCode === 38) {
        //38 is up arrow
        if (dir === "D") {
        } else this.setState({ dir: "U" });
      }
      if (e.keyCode === 39) {
        //39 is right arrow
        if (dir === "L") {
        } else this.setState({ dir: "R" });
      }
      if (e.keyCode === 40) {
        //40 is down arrow
        if (dir === "U") {
        } else this.setState({ dir: "D" });
      }
    });
  }

  render() {
    return (
      <div className="main">
        <div className="center">
          <button className="btn btn-default" onClick={this.newGame}>
            New Game
          </button>
          <button className="btn btn-default" onClick={this.play}>
            Play
          </button>
          <button className="btn btn-default" onClick={this.pause}>
            Pause
          </button>
        </div>
        <Grid rows={this.rows} cols={this.cols} GridArr={this.state.GridArr} />
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}
export default Main;
