
const express = require('express');
const Projects = require('./projects-model');
const { validateProjectData, validateProjectId, validateCompletedField } = require('./projects-middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {  // Add 'async'
    try {
        const projects = await Projects.get();  // Add 'await'
        res.status(200).json(projects);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project);
});

router.post('/', validateProjectData, async (req, res, next) => {
    try {
        const newProject = await Projects.insert(req.body);
        res.status(201).json(newProject);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', validateProjectData, validateCompletedField, validateProjectId, async (req, res, next) => {
    try {
        const updatedProject = await Projects.update(req.params.id, req.body);
        res.status(200).json(updatedProject);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id);
        res.status(200).json(actions);
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'Something went wrong inside the projects router',
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router;
