module.exports = {
  path: "/api/users/{userId}",
  method: "GET",
  config: {
    auth: { mode: "optional" },
    handler: function(request, reply) {
      let id = request.params.userId;
      this.models.User
        .get(id)
        .getJoin({ posts: true })
        .then(user => reply({ user }))
        .catch(err => reply(err));
    }
  }
};
