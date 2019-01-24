require('dotenv').config();

const config = {
    env: process.env.NODE_ENV,
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    user: process.env.MONGODB_USER,
    pwd: process.env.MONGODB_PWD,
    name: process.env.MONGODB_NAME,
};
const doAuth = (cfg) => (cfg.user && cfg.pwd) ? `${cfg.user}:${cfg.pwd}@` : '';
const suffix = (cfg) => (cfg.env === 'development' || cfg.env === 'production') ? '' : `-${cfg.env}`;
const setup = (cfg) => `mongodb://${doAuth(cfg)}${cfg.host}:${cfg.port}/${cfg.name}${suffix(cfg)}`;

module.exports = {
    uri: setup(config),
    options: {
        useNewUrlParser: true,
        useCreateIndex: true,
        promiseLibrary: Promise,
        family: 4,
    },
};