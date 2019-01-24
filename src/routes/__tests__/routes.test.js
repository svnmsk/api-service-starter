const request = require('supertest');
const Application = require(`${process.cwd()}/src/Application`);
const application = new Application();

const user = require('./user');

beforeAll(async () => await application.init());

afterAll(async () => {
    application.dbConnection.db.dropDatabase(()=>{
        application.dbConnection.close();
    });
});

user(application);