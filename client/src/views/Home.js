import React, { Component } from "react";
import { Divider } from "semantic-ui-react";

class Home extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Divider />
        <h1>MyFace</h1>
        <Divider />
      </div>
    );
  }
}

export default Home;
