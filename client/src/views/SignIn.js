import React, { Component } from "react";

import { login } from "../functions";

import { Divider, Form } from "semantic-ui-react";

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      account: {
        email: "",
        password: ""
      }
    };
  }

  onFormSubmit = submitEvent => {
    submitEvent.preventDefault();

    login(this.state.account).then(response => {
      let token = response.token;

      if (!token) {
        return "Email/password combo is invalid";
      }

      localStorage.setItem("token", token);

      this.props.history.push("/profile");
    });
  };

  onInputChange = changeEvent => {
    changeEvent.persist();

    this.setState(state => {
      return {
        account: {
          ...state.account,
          [changeEvent.target.name]: changeEvent.target.value
        }
      };
    });
  };
  render() {
    return (
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
        <h1>Account Sign In</h1>
        <Form onSubmit={this.onFormSubmit}>
          <input
            required
            name={"email"}
            placeholder={"example@example.com"}
            onChange={this.onInputChange}
            type="text"
          />
          <input
            required
            min={3}
            max={16}
            name={"password"}
            placeholder={"Password1"}
            onChange={this.onInputChange}
            type="password"
          />
          <Form.Button type="submit" content={"Submit"} />
        </Form>
      </div>
    );
  }
}

export default SignIn;
