// Container for all environments

const environments = {
  staging: {
    httpPort: 8000,
    httpsPort: 8001,
    envName: "staging",
    hashingSecret: "ThisIsASecret"
  },
  production: {
    httpPort: 5000,
    httpsPort: 5001,
    envName: "production",
    hashingSecret: "ThisIsAlsoASecret"
  }
};

// Determine which config to export
const currentEnv =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

// check that the environment is one of our config objects
const envToExport =
  typeof environments[currentEnv] == "object"
    ? environments[currentEnv]
    : environments.staging;

// export module
module.exports = envToExport;
