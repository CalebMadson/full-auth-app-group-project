module.exports = {
  path: "/api/users/current",
  method: "GET",
  config: {
    handler: function(request, reply) {
      let id = request.auth.credentials.id;

      this.models.User
        .get(id)
        .getJoin({ posts: true })
        .then(user => reply(user))
        .catch(err => reply(err));
    }
  }
};
