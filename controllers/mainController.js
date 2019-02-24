const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
// const config = require("./lib/config");
const fs = require("fs");
const helpers = require("../helpers");
const router = require("../router");
const handlers = require("../handlers");

function mainController(req, res) {
  // Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get the path from the URL and trim it
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // get the query string
  const queryStringObject = parsedUrl.query;

  // get the method
  const method = req.method.toLowerCase();

  // get the headers
  const headers = req.headers;

  // init a string decoder and buffer
  const decoder = new StringDecoder("utf-8");
  let buffer = "";

  // on the data event append the streamed and decoded data into the buffer variable
  req.on("data", data => {
    buffer += decoder.write(data);
  });

  // when the request has ended, we end the buffer and complete our actions
  req.on("end", () => {
    buffer += decoder.end();

    // Construct the data object to send to the handler

    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: helpers.parseJsonToObject(buffer)
    };

    // Choose the handler this request should go to
    const chosenHandler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : handlers.notFound;

    // Route the request to the handler specified in the router. Status and payload are given default values
    chosenHandler(data, (statusCode = 200, responsePayload = {}) => {
      // convert payload to string
      const payloadString = JSON.stringify(responsePayload);
      // return response
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);

      console.log("returning res: ", statusCode, payloadString);
    });
  });
}

module.exports = mainController;
