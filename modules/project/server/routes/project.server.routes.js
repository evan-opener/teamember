'use strict';

var projects = require('../controllers/project.server.controller.js');

module.exports = function(app) {
  // Routing logic   
  app.route('/api/projects')
    .get(projects.list)
    .post(projects.create);
  
  // Text can't pass for .param
  /*
  app.route('/api/projects/:projectId')
    .delete(projects.delete);
  
  app.param('project.id', projects.projectByID);
  
  */

};
