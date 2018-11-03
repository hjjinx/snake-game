import React, { Component } from "react";

class Box extends Component {
  render() {
    const classes = this.props.classes;
    return <div className={classes} id={this.props.id} />;
  }
}

export default Box;
