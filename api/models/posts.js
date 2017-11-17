module.exports = db => {
  let Post = db.createModel("Post", {
    msg: db.type.string().required(),
    time: db.type.string().required(),
    userId: db.type.string().required()
  });

  return Post;
};
