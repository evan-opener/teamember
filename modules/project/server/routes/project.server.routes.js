'use strict';

var project = require('../controllers/project.server.controller.js');

module.exports = function(app) {
  // Routing logic   
  app.route('/api/project')
    .get(project.list)
    .post(project.create);
  
  app.route('/api/project/:projectId')
    .get(project.read)
    .put(project.update)
    .delete(project.delete);
  
  app.param('projectId', project.projectByID);
};
