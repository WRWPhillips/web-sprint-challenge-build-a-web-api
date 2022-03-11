// npm import
const express = require('express');

// action import
const Projects = require('./projects-model');

// middleware import
const { 
    validateProjectsId, 
    validateProject
} = require('./projects-middleware');

// router declaration
const projectsRouter = express.Router();

// routes
projectsRouter.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            console.log(error);
            next(error);
            res.status(500).json({
                message: "Error retrieving projects"
            })
        })
});

projectsRouter.get('/:id', validateProjectsId, (req, res) => {
    res.status(200).json(req.project);
});


projectsRouter.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(next);
})

projectsRouter.put('/:id', validateProject, validateProjectsId,  (req, res, next) => {
    Projects.update(req.params.id, req.body)
    .then(project => {
        res.status(400).json(project); 
    })
    .catch(next);
})

projectsRouter.delete('/:id', validateProjectsId, (req, res, next) => {
    Projects.remove(req.params.id)
    .then(() => {
        res.status(201).json({message: 'deletion successful'})
    })
    .catch(error => {
        res.status(500).json({
            message: "Error deleting project"
        })
    })
});

projectsRouter.get('/:id/actions', validateProjectsId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(next);
})

// exports
module.exports = projectsRouter;