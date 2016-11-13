'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');
var Project = mongoose.model('Project');

/**
 * Create a Project
 */
exports.create = function (req, res) {
  var project = new Project(req.body);
  
  project.save(function (err){
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(project);
    }
  });
};

/**
 * Show the current Project
 */
exports.read = function (req, res) {
  var project = req.project ? req.project.toJSON() : {};

  res.jsonp(project);
};

/**
 * Update a Project
 */
exports.update = function (req, res) {
  var project = req.project;

  project = _.extend(project, req.body);

  project.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(project);
    }
  });
};

/**
 * Delete an Project
 */
exports.delete = function (req, res) {
  var project = req.project;
  
  project.remove(function (err){
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(project);
    }
  }
  );
};


/**
 * List of Projects
 */
exports.list = function (req, res) {

  Project.find(function (err, projects){
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
        
      });
    }else{
      res.json(projects);
    }
  });

};

//Project middleware
exports.projectById = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValide(id)) {
    return res.status(400).send({
      message: 'Project ID is invalid'
    });
  }
  
  Project.findById(id).populate('projectName', 'projectCode').exec(function (err, project) {
    if (err) {
      return next(err);
    } else if (!project) {
      return res.status(404).send({
        message: 'No project with that identifier has been found'
      });
    }
    req.project = project;
    next();
  });
};

