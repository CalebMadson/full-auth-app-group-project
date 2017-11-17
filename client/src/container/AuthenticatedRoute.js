import React, { Component } from "react";
import { Route } from "react-router-dom";
import jwt from "jsonwebtoken";
import { Divider } from "semantic-ui-react";

class AuthenticatedRoute extends Component {
  constructor() {
    super();

    this.state = {
      authenticated: false
    };
  }

  componentWillMount() {
    let token = localStorage.getItem("token");

    if (!token) {
      return this.setState(state => {
        return {
          authenticated: false
        };
      });
    }

    token = jwt.decode(token);

    if (!token || !token.id) {
      return this.setState(state => {
        return {
          authenticated: false
        };
      });
    }

    return this.setState(state => {
      return {
        authenticated: true
      };
    });
  }
  render() {
    let { authenticated } = this.state;
    return authenticated ? (
      <div>
        <Route {...this.props} />
      </div>
    ) : (
      <div>
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
        <h1> Please Login</h1>
      </div>
    );
  }
}

export default AuthenticatedRoute;
