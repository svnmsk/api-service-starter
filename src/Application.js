const dbConnect = require('./db/connect');
const MigrateMongoose = require('migrate-mongoose');
const ApplicationError = require('./errors/ApplicationError');
const config = require('../config');
const app = require('./app');
const server = require('./server');
const logger = require('./utils/logger');

class Application {

    constructor() {
        this.app = null;
        this.dbConnection = null;
        this.server = null;
    }

    start() {
        if (!this.app) this.exit(new ApplicationError('Application is not initialized.'));
        try {
            this.server = server(this.app);
        } catch (e) {
            this.exit(e);
        }
    }

    async init() {
        try {
            this.dbConnection =  await dbConnect(config.db);
            this.app = app();
        } catch (e) {
            console.error('Error while init application.', e.message);
            this.exit(e);
        }
    }

    close() {
        this.server.close(() => {
            logger.info( "Server closed.");
            this.dbConnection.close();
        });
    }

    exit(e) {
        let code = 0;
        if (e) {
            console.error(e);
            logger.error(e.message);
            code = 1;
        }
        process.exit(code);
    }

    static checkConfig() {
        let message = null;

        if (!config.env) message = 'The "NODE_ENV" is not set.';
        if (!config.jwt.secret) message = 'The "JWT_SECRET" is not set.';
        if (message) {
            logger.error(message);
            process.exit(1);
        }
        logger.info('Configuration check successfully done. Application launch ...');
    }

    /**
     * Checks for new database migrations
     */
    static async checkMigrations() {

        const tool = new MigrateMongoose({
            migrationsPath:  "./src/db/migrations",
            dbConnectionUri: config.db.uri,
            es6Templates: true,
            autosync: true
        });

        try {
            let list = await tool.list();
            const toUpdate = list.filter((item) => item.state === 'down');

            if (toUpdate.length) {
                console.warn(`
/**
 * New database migrations has been found. 
 * Run the following command from the project root folder:
 * NODE_ENV=${config.env} node ./scripts/migrate
 */
                `.yellow);

                return Promise.resolve();
            }
        } catch (e) {
            logger.error('\nAn error has occurred');
            logger.error(e.message);
        }
    }
}

module.exports = Application;