module.exports = {
  path: "/api/comments",
  method: "POST",
  config: {
    handler: function(request, reply) {
      let comment = new this.models.Comment(request.payload);

      this.models.User
        .get(request.auth.credentials.id)
        .then(user => {
          if (!user) throw "No user with id";
          let { email, profilepic } = user;
          comment.user = { email, profilepic };

          return comment.save();
        })
        .then(comment => {
          reply(comment);
        })
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};
