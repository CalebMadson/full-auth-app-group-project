module.exports = {
  path: "/api/posts",
  method: "GET",
  config: {
    auth: { mode: "optional" },
    handler: function(request, reply) {
      this.models.Post
        .filter({})
        .getJoin({ user: true })
        .then(results => reply(results))
        .catch(err => reply(err));
    }
  }
};
