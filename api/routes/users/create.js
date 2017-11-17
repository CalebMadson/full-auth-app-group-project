module.exports = {
  path: "/api/users",
  method: "POST",
  config: {
    auth: { mode: "optional" },
    handler: function(request, reply) {
      let user = new this.models.User(request.payload);

      user
        .save()
        .then(user => {
          delete user.password;
          reply(user);
        })
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};
