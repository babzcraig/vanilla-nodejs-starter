const handlers = require("../handlers");

// Define a request router
const router = {};

// Routes
router.ping = handlers.ping;
router.users = handlers.users;

module.exports = router;
