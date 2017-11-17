import React, { Component } from "react";

import { createPost, deletePost, currentUser } from "../functions";

import { Feed, Divider, Form, Button } from "semantic-ui-react";

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      profile: {
        picture: "",
        username: ""
      },
      post: { time: 0 },
      posts: []
    };
  }

  profileDecoration = () => {
    currentUser().then(data => {
      if (!data || !data.profilepic) {
        data.profilepic = "https://i.ytimg.com/vi/bgb9OZ9RXsE/hqdefault.jpg";
      }

      this.setState(state => {
        return {
          profile: {
            ...state.profile,
            picture: data.profilepic,
            username: data.email
          }
        };
      });
    });
  };

  componentDidMount() {
    this.fetchPosts();
    this.profileDecoration();
  }

  fetchPosts = () => {
    currentUser().then(data => {
      if (!data || data.error) {
        return;
      }

      this.setState(state => {
        return { posts: data.posts };
      });
    });
  };

  removeThis = id => {
    deletePost(id).then(() => {
      this.fetchPosts();
    });
  };

  onFormSubmit = submitEvent => {
    submitEvent.preventDefault();
    let timeStamp = new Date();

    this.setState(
      state => {
        return {
          post: {
            ...state.post,
            time: timeStamp
          }
        };
      },
      () => {
        createPost(this.state.post)
          .then(() => {
            this.fetchPosts();

            this.setState(state => {
              return { post: { msg: "" } };
            });
          })
          .catch(err => console.log(err));
      }
    );
  };

  onInputChange = changeEvent => {
    changeEvent.persist();

    this.setState(state => {
      return {
        post: {
          ...state.post,
          [changeEvent.target.name]: changeEvent.target.value
        }
      };
    });
  };

  logOut = () => {
    localStorage.removeItem("token");

    this.props.history.push("/");
  };

  render() {
    console.log(this.state);
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
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
        <div>
          <Button onClick={() => this.logOut()}>Logout</Button>
        </div>
        <h1>Profile</h1>
        <img src={this.state.profile.picture} width={150} height={150} />
        <h3>{this.state.profile.username}</h3>
        <br />
        <Form
          onSubmit={this.onFormSubmit}
          style={{ display: "flex", flexDirection: "column", maxWidth: 300 }}
        >
          <Form.TextArea
            label="Post"
            value={this.state.post.msg}
            onChange={this.onInputChange}
            name="msg"
          />
          <Form.Button>Submit</Form.Button>
        </Form>
        <Divider />
        {this.state.posts.map(item => (
          <Feed key={item.id}>
            <Feed.Event>
              <Feed.Label>
                <img src={this.state.profile.picture} />
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User>{this.state.profile.username}</Feed.User>
                  <Feed.Date>
                    {new Date(item.time).toLocaleTimeString()}
                  </Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                  {item.msg}
                  <Button onClick={() => this.removeThis(item.id)}>X</Button>
                </Feed.Extra>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        ))}
      </div>
    );
  }
}

export default Profile;
