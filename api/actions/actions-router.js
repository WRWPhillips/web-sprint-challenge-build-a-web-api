// npm import
const express = require('express');
// action import
const Actions = require('./actions-model');
// middleware import
const {
    validateActionId,
    validateAction
} = require('./actions-middleware');
// router declaration
const actionsRouter = express.Router();

// routes
actionsRouter.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            console.log(error);
            next(error);
            res.status(500).json({
                message: "Error retrieving actions"
            })
        })
})

actionsRouter.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.actions);
});

actionsRouter.post('/', validateAction, (req, res, next) => {
    Actions.insert(req.body)
    .then(action => {
        res.status(201).json(action);
    })
    .catch(next);
})

actionsRouter.put('/:id', validateAction, validateActionId,  (req, res, next) => {
    Actions.update(req.params.id, req.body)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(next);
})

actionsRouter.delete('/:id', validateActionId, (req, res) => {
    Actions.remove(req.params.id)
    .then(() => {
        res.status(201).json({
            message: 'Deletion successful'
        })
    })
    .catch(error => {
        res.status(500).json({
            message: "Error deleting project"
        })
    })
});

// exports
module.exports = actionsRouter;
