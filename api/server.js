const express = require('express');
const helmet = require('helmet');
// Import routers for actions and projects
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

const server = express();
// Configure your server here

// Use the routers with their respective base paths
server.use(helmet());
server.use(express.json());
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);
server.use('/', (req, res) => {
    res.send("hello");
});
//server.use('/api/projects', projectsRouter);

module.exports = server;
