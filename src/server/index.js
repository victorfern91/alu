const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(helmet());

server.use(
    '/lang',
    express.static(
        `${process.cwd()}/static`,
        { index: false, extensions: ['json'] }
    )
);

server.listen(process.env.PORT);

module.exports = server;
