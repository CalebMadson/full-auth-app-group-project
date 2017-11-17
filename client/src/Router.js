import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import Home from "./views/Home";
import Profile from "./views/Profile";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import PostPage from "./views/PostPage";
import AuthenticatedRoute from "./container/AuthenticatedRoute";

import {
  Sidebar,
  Segment,
  Button,
  Menu,
  Icon,
  Divider
} from "semantic-ui-react";

class Router extends Component {
  state = { visible: false };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    const { visible } = this.state;
    return (
      <BrowserRouter>
        <div>
          <Button onClick={this.toggleVisibility}>Menu</Button>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation="overlay"
              direction="top"
              visible={visible}
              inverted
            >
              <Menu.Item name="home">
                <Icon name="home" />
                <Link to={"/"}>Home</Link>
              </Menu.Item>
              <Menu.Item name="signup">
                <Icon name="add user" />

                <Link to={"/signup"}>Sign Up</Link>
              </Menu.Item>
              <Menu.Item name="signin">
                <Icon name="user" />

                <Link to={"/signin"}>Sign In</Link>
              </Menu.Item>
              <Menu.Item name="posts">
                <Icon name="comments" />
                <Link to={"/posts"}>Posts</Link>
              </Menu.Item>
              <Menu.Item name="profile">
                <Icon name="id card" />

                <Link to={"/profile"}>Profile</Link>
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment basic>
                <Switch>
                  <Route exact path={"/"} component={Home} />
                  <Route exact path={"/signup"} component={SignUp} />
                  <Route exact path={"/signin"} component={SignIn} />
                  <AuthenticatedRoute
                    exact
                    path={"/profile"}
                    component={Profile}
                  />
                  <AuthenticatedRoute
                    exact
                    path={"/posts"}
                    component={PostPage}
                  />
                </Switch>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
