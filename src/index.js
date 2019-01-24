const Application = require('./Application');
const application = new Application();
const logger = require('./utils/logger');

// TODO add logger module (winston or similar)
process.on('unhandledRejection', (error, p) => {
    logger.error(error.message, {pid: process.pid, reason: error});
});

(async () => {
    Application.checkConfig();
    await Application.checkMigrations();
    await application.init();
    application.start();
})();