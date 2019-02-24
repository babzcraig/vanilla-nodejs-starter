// Dependencies
const http = require("http");
const mainController = require("./controllers/mainController");
const config = require("./lib/config");

// Set up an http server
const httpServer = http.createServer(mainController);

// start the http server
httpServer.listen(config.httpPort, () => {
  console.log("server started on port", config.httpPort);
});
