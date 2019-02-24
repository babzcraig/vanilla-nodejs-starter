// Define our handlers
const handlers = {};

// Ping
handlers.ping = (data, cb) => {
  cb(200);
};

// Not found handler
handlers.notFound = (data, cb) => {
  cb(404);
};

module.exports = handlers;
