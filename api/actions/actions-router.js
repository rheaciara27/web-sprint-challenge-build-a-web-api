// Write your "actions" router here!
const express = require('express');

const Actions = require('./actions-model');
const Middleware = require('./actions-middlware'); 


const router = express.Router();


// [GET] /api/actions
router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get(); // Use get() method from actions-model
        res.status(200).json(actions);
    } catch (err) {
        next(err);
    }
});

// [GET] /api/actions/:id
router.get('/:id', Middleware.validateActionId, (req, res) => {
    res.status(200).json(req.action); // req.action is attached by the Middleware.validateActionId
});



// [POST] /api/actions
router.post('/',  Middleware.validateActionData, async (req, res, next) => {
    try {
        const newAction = await Actions.insert(req.body); // Use insert() method from actions-model
        res.status(201).json(newAction);
    } catch (err) {
        next(err);
    }
});

// [PUT] /api/actions/:id
router.put('/:id', Middleware.validateActionId, Middleware.validateCompletedField, Middleware.validateActionData, async (req, res, next) => {
    try {
        const updatedAction = await Actions.update(req.params.id, req.body);
        if (updatedAction) {
            res.status(200).json(updatedAction);
        } else {
            res.status(404).json({ message: 'Action not found' });
        }
    } catch (err) {
        next(err);
    }
});

// [DELETE] /api/actions/:id
router.delete('/:id', Middleware.validateActionId, async (req, res, next) => {
    try {
        const count = await Actions.remove(req.params.id);
        if (count > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Action not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Error handling middleware
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        customMessage: 'Something went wrong inside the actions router',
    });
});

module.exports = router;
