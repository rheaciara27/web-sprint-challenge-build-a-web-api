// add middlewares here related to projects
const Projects = require('./projects-model');

// Middleware to validate project data
function validateProjectData(req, res, next) {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ 
        message: 'Missing required fields: name and/or description' });
    }

    next();
}

function validateCompletedField(req, res, next) {
    const { completed } = req.body;

    if (completed === undefined) {
        return res.status(400).json({ message: 'Missing required field: completed' });
    }

    next();
}

// Middleware to validate project ID
async function validateProjectId(req, res, next) {
    const { id } = req.params;

    try {
        const project = await Projects.get(id);

        if (project) {
            req.project = project; // Attach the project to the request object for later use
            next();
        } else {
            return res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error validating project ID' });
    }
}
module.exports = {
    validateProjectData,
    validateProjectId, 
    validateCompletedField,
};
