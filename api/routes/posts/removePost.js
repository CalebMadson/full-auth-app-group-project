module.exports = {
  path: "/api/posts/{postId}",
  method: "DELETE",
  config: {
    handler: function(request, reply) {
      let postId = request.params.postId;

      this.models.Post
        .get(postId)
        .then(post => post.purge())
        .then(result => reply(true))
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};
