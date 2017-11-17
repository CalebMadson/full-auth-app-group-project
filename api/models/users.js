const bcrypt = require("bcrypt-as-promised");
const jwt = require("jsonwebtoken");

module.exports = db => {
  let User = db.createModel("User", {
    email: db.type.string().required(),
    password: db.type.string().required(),
    profilepic: db.type.string().required()
  });

  User.define("generatePassword", function() {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(this.password, salt))
      .then(hash => Object.assign(this, { password: hash }))
      .catch(err => err);
  });

  User.define("comparePassword", function(password) {
    return bcrypt
      .compare(password, this.password)
      .then(authed => (authed ? this : false))
      .catch(bcrypt.MISMATCH_ERROR, () => "Email/password combo is invalid")
      .catch(err => err);
  });

  User.define("generateJWT", function() {
    return jwt.sign(Object.assign({}, this), "supersecretsecret", {
      algorithm: "HS256"
    });
  });

  User.pre("save", function(next) {
    User.filter({ email: this.email }).then(users => {
      if (users.length > 0) {
        return next("Email/password combo is invalid");
      }
    });
    return this.generatePassword()
      .then(() => next())
      .catch(err => next(err));
  });

  return User;
};
