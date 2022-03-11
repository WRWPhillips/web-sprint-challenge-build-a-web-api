// npm import
const express = require('express');
// router imports
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');
// custom middleware import
const { logger } = require('./projects/projects-middleware');
// server declaration
const server = express();
// middleware uses
server.use(express.json());
server.use(logger);
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);
// base route
server.get('/', (req, res) => {
    res.send("server working");
});
// export
module.exports = server;
