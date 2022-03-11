// model import
const Actions = require('./actions-model');

// middlewares
async function validateActionId(req, res, next) {
    const id = req.params.id;
    const actions = await Actions.get(id);
    if(!actions) {
      res.status(404).json({ message: "actions not found" });
    } else {
      req.actions = actions;
      next();
    }
}

function validateAction(req, res, next) {
    const { description, notes, completed, project_id } = req.body;
    if( !description || !notes || completed === undefined || !project_id) {
        res.status(400).json({ message: "missing required field"});
    } else {
        next();
    }
}

// middleware exports
module.exports = {
    validateActionId,
    validateAction
}