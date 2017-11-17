import React, { Component } from "react";
import { getAllPosts, getPostById } from "../functions";

import FormComment from "./FormComment";
import { Feed, Divider, Form, Button } from "semantic-ui-react";

class PostPage extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };
  }

  logOut = () => {
    localStorage.removeItem("token");

    this.props.history.push("/");
  };

  fetchPosts = () => {
    getAllPosts().then(data => {
      this.setState(state => {
        return {
          ...state,
          posts: data.sort(
            (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
          )
        };
      });
    });
  };

  componentDidMount() {
    this.fetchPosts();
  }

  render() {
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
          <button onClick={() => this.logOut()}>Logout</button>
        </div>
        <h1>Post Page</h1>
        {this.state.posts.map(item => <PostContainer post={item} />)}
      </div>
    );
  }
}

class PostContainer extends Component {
  constructor() {
    super();

    this.state = {
      post: {}
    };
  }

  fetchPost = () => {
    getPostById(this.props.post.id).then(data => {
      this.setState(state => {
        return {
          post: data
        };
      });
    });
  };

  componentDidMount() {
    this.fetchPost();
  }

  render() {
    let { post } = this.state;

    if (!post.id) return null;

    return (
      <Feed>
        <Feed.Event>
          <Feed.Label>
            <img src={post.user.profilepic} />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>{post.user.email}</Feed.User>
              <Feed.Date>{new Date(post.time).toLocaleTimeString()}</Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>{post.msg}</Feed.Extra>
            <FormComment post={post} fetchPost={this.fetchPost} />
            {post &&
              post.comments.map(item => (
                <div>
                  <Feed>
                    <Feed.Event>
                      <Feed.Label>
                        <img src={item.user.profilepic} />
                      </Feed.Label>
                      <Feed.Content>
                        <Feed.Summary>
                          <Feed.User>{item.user.email}</Feed.User>
                          <Feed.Date>
                            {new Date(item.time).toLocaleTimeString()}
                          </Feed.Date>
                        </Feed.Summary>
                        <Feed.Extra text>{item.msg}</Feed.Extra>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </div>
              ))}
          </Feed.Content>
        </Feed.Event>
      </Feed>
    );
  }
}

export default PostPage;
