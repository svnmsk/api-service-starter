const maxAge = 1200;

let origin = ['http://localhost'];
if (process.env.NODE_ENV !== 'production') {
    origin = [
        ...origin,
        'http://localhost:3000',
        'http://localhost:6000',
        'http://localhost:6001',
        'http://localhost:5000',
    ];
}

const methods = ['OPTIONS', 'GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'HEAD'];

const allowedHeaders = [
    'X-Requested-With',
    'If-Modified-Since',
    'Cache-Control',
    'DNT',
    'X-CustomHeader',
    'Keep-Alive',
    'User-Agent',
    'Content-Type',
    'Authorization',
    'Pragma'
];

module.exports = {
    origin,
    methods,
    allowedHeaders,
    maxAge,
    preflightContinue: true
};
