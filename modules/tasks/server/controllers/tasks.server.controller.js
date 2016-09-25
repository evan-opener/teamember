'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Task = mongoose.model('Tasks'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Task
 */
exports.create = function (req, res) {
  var task = new Task(req, res);
  task.author = req.user;
  
  task.save(function (err) {
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }else{
      res.json(task);
    }
  });
};

/**
 * Show the current Task
 */
exports.read = function (req, res) {

};

/**
 * Update a Task
 */
exports.update = function (req, res) {

};

/**
 * Delete an Task
 */
exports.delete = function (req, res) {
  var task = req.task;
  
  task.remove(function (err){
    if(err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }else{
      res.json(task);
    }
  });

};

/**
 * List of Tasks
 */
exports.list = function (req, res) {
  Task.find().populate('author', 'displayName').exec(function (err, tasks){
    if(err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }else{
      res.json(tasks);
    }
  });
};

/*
  Task middleware
*/
exports.taskByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Task ID is invalid'
    });
  }
  
  Task.findById(id).populate('author', 'displayName').exec(function (err, tasks) {
    if (err) {
      return next(err);
    } else if (!tasks) {
      return res.status(400).send({
        message: 'No task with that identifier has been found'
      });
    }
    req.tasks = tasks;
    next();
  });
};