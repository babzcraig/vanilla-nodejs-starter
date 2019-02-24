const crypto = require("crypto");
const config = require("../lib/config");
// container for helpers
const helpers = {};

// Create a SHA256 hash
helpers.hash = string => {
  if (typeof string == "string" && string.length) {
    const hash = crypto
      .createHmac("sha256", config.hashingSecret)
      .update(string)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};

// Parse a JSON string to an object in all cases without throwing
helpers.parseJsonToObject = string => {
  try {
    const obj = JSON.parse(string);
    return obj;
  } catch (e) {
    return {};
  }
};

// Export helpers module
module.exports = helpers;
