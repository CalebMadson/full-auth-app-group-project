module.exports = {
  path: "/api/users/login",
  method: "POST",
  config: {
    auth: { mode: "optional" },
    handler: function(request, reply) {
      let { email, password } = request.payload;

      this.models.User
        .filter({ email: email })
        .then(users => {
          if (users.length === 0) {
            throw "Email/password combo is invalid";
          }

          let [user] = users;

          return user.comparePassword(password);
        })
        .then(user => {
          if (!user) {
            throw "Email/password combo is invalid";
          }

          delete user.password;

          return user.generateJWT();
        })
        .then(token => reply({ token }))
        .catch(err => reply(err));
    }
  }
};
