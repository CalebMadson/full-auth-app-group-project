module.exports = {
  path: "/api/posts",
  method: "POST",
  config: {
    handler: function(request, reply) {
      let post = new this.models.Post(request.payload);

      post.userId = request.auth.credentials.id;

      this.models.User
        .get(request.auth.credentials.id)
        .then(user => {
          if (!user) throw "No user with id";
          post.user = user.id;

          return post.save();
        })
        .then(post => {
          reply(post);
        })
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};
