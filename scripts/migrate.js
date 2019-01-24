const migrateMongoose = require('migrate-mongoose');
const argv = require('yargs').argv;
const config = require('../config');
const migrationCfg = require('../migrate');
const Application = require('../src/Application');

const tool = new migrateMongoose({
    migrationsPath:  migrationCfg.migrationsDir,
    dbConnectionUri: config.db.uri,
    es6Templates: migrationCfg.es6,
    autosync: migrationCfg.autosync
});

const mapper = (item) => console.log(` ${item.state}\t${item.name}`);
const logger = (data) => data.map(mapper);

(async () => {
    Application.checkConfig();

    try {
        let list = await tool.list();

        const toUpdate = list.filter((item) => item.state === 'down');
        if (!toUpdate.length) {
            console.log('\nThere are no migrations to run:');
            logger(list);
            process.exit(0);
        }

        console.log(`\nRun migrations:`);
        logger(toUpdate);

        await tool.run('up');
        console.log(`\nComplete:`);

        list = await tool.list();
        logger(list);
        process.exit(0);
    } catch (e) {
        console.error('\nAn error has occurred');
        console.error(e.message);
        process.exit(1);
    }
})();
