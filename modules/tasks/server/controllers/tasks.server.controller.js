'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Task = mongoose.model('Task'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Task
 */
exports.create = function(req, res) {
  var task = new Task(req.body);
  task.user = req.user;
  var project = task.project;
  task.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(task);

    }
  });
  Task.findById(task._id).populate('project').exec(function (err, task) {
    if (err) {
      return err;
    }
    this.task.project.tasks.push(this.task);
    // TODO: how to save the task in project?
    this.task = task;
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
  task.isCurrentUserOwner = req.user && task.user && task.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(task);
};

/**
 * Update a Task
 */
exports.update = function(req, res) {
  var task = req.task ;

  task = _.extend(task , req.body);

  task.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      task.project.tasks.push(task);
      res.jsonp(task);
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
