'use strict';
var tasks = require('../controllers/tasks.server.controller');

module.exports = function(app) {
  // Routing logic   
  app.route('/api/tasks')
    .get(tasks.list)
    .post(tasks.create);
  
  app.route('/api/tasks/:postId')
    .delete(tasks.delete);
  
  app.param('taskId', tasks.taskByID);
};
 