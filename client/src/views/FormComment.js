import React, { Component } from "react";
import { getComment, createComment } from "../functions";

import { Form, Button } from "semantic-ui-react";

class FormComment extends Component {
  constructor() {
    super();

    this.state = {
      visible: false,
      comment: {
        msg: ""
      }
    };
  }

  onFormSubmit = submitEvent => {
    submitEvent.preventDefault();
    let timeStamp = new Date();

    let { comment } = this.state;

    comment.time = timeStamp;
    comment.postId = this.props.post.id;

    createComment(comment)
      .then(() => {
        this.props.fetchPost();

        this.setState(state => {
          return { post: { msg: "" } };
        });
      })
      .catch(err => console.log(err));
  };

  onInputChange = changeEvent => {
    changeEvent.persist();

    this.setState(state => {
      return {
        comment: {
          ...state.comment,
          [changeEvent.target.name]: changeEvent.target.value
        }
      };
    });
  };

  showCommentField = () => {
    console.log(this.state.visible);
    this.setState(state => {
      return {
        ...state,
        visible: !state.visible
      };
    });
  };

  render() {
    return (
      <div>
        {this.state.visible && (
          <Form
            reply
            animation="scale"
            duration={500}
            onSubmit={this.onFormSubmit}
          >
            <Form.TextArea name={"msg"} onChange={this.onInputChange} />
            <Button
              content="Add Comment"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        )}
        <button type="button" onClick={() => this.showCommentField()}>
          Comment
        </button>
      </div>
    );
  }
}

export default FormComment;
