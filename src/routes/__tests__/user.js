const request = require('supertest');
const user = {login: 'username', password: 'password'};
let token;

module.exports = (application) => {

    describe('POST /user/login', () => {

        test('authorize default user', async () => {
            const response = await request(application.app)
                .post('/user/login')
                .set('X-Requested-With', 'XMLHttpRequest')
                .send({login: 'user', password: '123456'})
            ;
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(
                expect.objectContaining({
                    success: true,
                    data: expect.objectContaining({
                        access: expect.any(String),
                        refresh: expect.any(String),
                    }),
                })
            );
            token = response.body.data;
        });
    });

    describe('POST /user/register', () => {
        let response;

        test('only for authorized users', async () => {
            response = await request(application.app)
                .post('/user/register')
                .set('X-Requested-With', 'XMLHttpRequest')
                .send(user)
            ;
            expect(response.statusCode).toBe(401);
            expect(response.body.success).toBeFalsy();
        });

        test('should create new user', async () => {
            response = await request(application.app)
                .post('/user/register')
                .set('X-Requested-With', 'XMLHttpRequest')
                .set('Authorization', token.access)
                .send(user)
            ;
            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data).toBeUndefined();
        });

        test('should not create user with exists login', async () => {
            response = await request(application.app)
                .post('/user/register')
                .set('X-Requested-With', 'XMLHttpRequest')
                .set('Authorization', token.access)
                .send(user)
            ;
            expect(response.statusCode).toBe(400);
            expect(response.body.success).toBeFalsy();
        });
    });

    describe('POST /user/token', () => {
        let response;

        test('only for authorized users', async () => {
            response = await request(application.app)
                .put('/user/token')
                .set('X-Requested-With', 'XMLHttpRequest')
            ;
            expect(response.statusCode).toBe(401);
            expect(response.body.success).toBeFalsy();
        });

        test('should return new tokens pair', async () => {
            response = await request(application.app)
                .put('/user/token')
                .set('X-Requested-With', 'XMLHttpRequest')
                .set('Authorization', token.refresh)
            ;
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(
                expect.objectContaining({
                    success: true,
                    data: expect.objectContaining({
                        access: expect.any(String),
                        refresh: expect.any(String),
                    }),
                })
            );
        });
    });

};


