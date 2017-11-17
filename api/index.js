const hapi = require("hapi");
const hapiAuthJWT = require("hapi-auth-jwt2");
const api = require("./api");

const Server = new hapi.Server();

Server.connection({
  host: "localhost",
  port: 4040,
  routes: { cors: true },
  router: { stripTrailingSlash: true }
});

Server.register(
  [
    hapiAuthJWT,
    {
      register: api
    }
  ],
  Server.start()
    .then(() => console.log(`Server Started at ${Server.info.uri}`))
    .catch(err => console.log(err))
);
