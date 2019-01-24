const winston = require('winston');
const fs = require('fs');
const Sentry = require('winston-sentry');
require('winston-daily-rotate-file');
const config = require('../../config');

const dir = 'log';

/**
 * error:   0
 * warn:    1
 * info:    2
 * verbose: 3
 * debug:   4
 * silly:   5
 */

if (!fs.existsSync(dir)) { fs.mkdirSync(dir); }

let levels = {generic: {}};


switch (config.env) {

    case 'production':
        levels.generic.console  = -1;
        levels.generic.file     = 'info';
        levels.generic.sentry   = 'warn';
        break;

    case 'development':
        levels.generic.console  = 'silly';
        levels.generic.file     = 'info';
        levels.generic.sentry   = -1;
        break;

    default:
        levels.generic.console  = -1;
        levels.generic.file     = -1;
        levels.generic.sentry   = -1;
        break;
}

let transports = [
    new (winston.transports.DailyRotateFile)({
        dirname: dir,
        level: levels.generic.file,
        filename: 'service-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '1d',
    }),
    new winston.transports.Console({
        format: winston.format.cli(),
        level: levels.generic.console,
    })
];

if (config.sentry.dsn) transports.push(new Sentry({
    patchGlobal: config.env === 'production',
    level: levels.generic.sentry,
    dsn: config.sentry.dsn
}));

winston.loggers.add('generic', {
    transports
});

module.exports = winston.loggers.get('generic');