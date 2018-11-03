import React, { Component } from "react";
import Box from "./Box";

class Grid extends Component {
  render() {
    const totalWidth = this.props.cols * 40;
    var BoxArr = [];
    for (let i = 0; i < this.props.rows; i++) {
      BoxArr.push([]);
      for (let j = 0; j < this.props.cols; j++) {
        let key = i + " " + j;
        let value = this.props.GridArr[i][j];
        let classes = "box";
        if (value === "SH") classes += " snake head";
        // Value can be null, snake head, snake body, or food
        else if (value === "S") classes += " snake";
        else if (value === "F") classes += " food";
        BoxArr[i].push(<Box key={key} classes={classes} id={key} />);
      }
    }
    return (
      <div className="grid" style={{ width: totalWidth }}>
        {BoxArr}
      </div>
    );
  }
}

export default Grid;
