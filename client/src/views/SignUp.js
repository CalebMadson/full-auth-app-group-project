import React, { Component } from "react";

import { createAccount } from "../functions";

import { Divider, Form } from "semantic-ui-react";

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      account: {
        email: "",
        password: "",
        profilepic: ""
      }
    };
  }

  onFormSubmit = submitEvent => {
    submitEvent.preventDefault();

    createAccount(this.state.account).then(() => {
      this.props.history.push("/signin");
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
        <h1>Create Account</h1>
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
          <input
            type="text"
            name={"profilepic"}
            placeholder={"Profile Pic Url"}
            onChange={this.onInputChange}
          />
          <Form.Button type="submit" content={"Submit"} />
        </Form>
      </div>
    );
  }
}

export default SignUp;
