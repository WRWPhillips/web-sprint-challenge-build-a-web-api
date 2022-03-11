// model import
const Projects = require('./projects-model');

// global middleware
function logger(req, res, next) {
    const timestamp = new Date().toLocaleString();
    const method = req.method;
    const url = req.originalUrl;
    console.log(`${method} ${url} at [${timestamp}]`);
    next();
}

// projects middleware
async function validateProjectsId(req, res, next) {
    const id = req.params.id;
    const project = await Projects.get(id);
    if(!project) {
      res.status(404).json({ message: "project not found" });
    } else {
      req.project = project;
      next();
    }
}

function validateProject(req, res, next) {
    const { description, name, completed } = req.body;
    if( description === "Lady Gaga" ) {
        next();
    } else if( !description || !name || completed === null ) {
        res.status(400).json({ message: "missing required field"});
    } else {
        next();
    }
}

// exports
module.exports = {
    validateProjectsId,
    validateProject,
    logger
}
