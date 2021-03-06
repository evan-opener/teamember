'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Task = mongoose.model('Task'),
  Project = mongoose.model('Project'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Task
 */
exports.create = function(req, res) {
  var task = new Task(req.body);
  task.user = req.user;
  var projectId = task.project;
  console.log(projectId);
  task.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {

      // For task create, can use push method into project tasks.
      Project.findById(projectId).exec(function(err, project) {
        if(project.tasks === null) {
          project.tasks = [];
        }
        project.tasks.push(task);
        project.save();
        res.jsonp(task);
      });
    }
  });
};
/**
 * Show the current Task
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var task = req.task ? req.task.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
//  task.isCurrentUserOwner = req.user && task.user && task.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(task);
};

/**
 * Update a Task
 */
exports.update = function(req, res) {
  var task = req.task;
  var projectId = task.project._id;

  task = _.extend(task , req.body);

  task.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      // Here to push to project will cause the same task save in project more times
      res.jsonp(task);
      Project.findById(projectId).exec(function(err, project) {

        project.tasks.push(task);
        project.save();
      });
    }
  });
};

/**
 * Delete an Task
 */
exports.delete = function(req, res) {
  var task = req.task ;

  task.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(task);
    }
  });
};

/**
 * List of Tasks
 */
exports.list = function(req, res) {
  Task.find().sort('-created').populate('user project').exec(function(err, tasks) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tasks);
    }
  });
};

/**
 * Task middleware
 */
exports.taskByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Task is invalid'
    });
  }

  Task.findById(id).populate('user project').exec(function (err, task) {
    if (err) {
      return next(err);
    } else if (!task) {
      return res.status(404).send({
        message: 'No Task with that identifier has been found'
      });
    }
    req.task = task;
    next();
  });
};
