const thinky = require("thinky");

const db = thinky({
  db: "myface"
});

let User = require("./users")(db);
let Post = require("./posts")(db);
let Comment = require("./comment")(db);

User.hasMany(Post, "posts", "id", "userId");
Post.hasOne(User, "user", "userId", "id");
Post.hasMany(Comment, "comments", "id", "postId");

module.exports = { User: User, Post: Post, Comment: Comment };
