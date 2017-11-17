module.exports = {
  path: "/api/posts/{postId}",
  method: "GET",
  config: {
    handler: function(request, reply) {
      let id = request.params.postId;

      this.models.Post
        .get(id)
        .getJoin({ comments: true, user: true })
        .then(post => reply(post))
        .catch(err => reply(err));
    }
  }
};
