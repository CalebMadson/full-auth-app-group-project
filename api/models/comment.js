module.exports = db => {
  let Comment = db.createModel("Comment", {
    msg: db.type.string().required(),
    time: db.type.string().required(),
    postId: db.type.string().required(),
    user: db.type.object().required()
  });

  return Comment;
};
