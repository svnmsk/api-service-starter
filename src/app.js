const express = require('express');
const middleware = require('./middleware');
const routes = require('./middleware/routes');

module.exports = () => {
    const app = express();

    app.use(middleware(app));
    routes(app);

    return app;
};