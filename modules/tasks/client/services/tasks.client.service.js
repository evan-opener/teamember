(function () {
  'use strict';

  angular
    .module('tasks')
    .factory('tasksService', tasksService);

  tasksService.$inject = ['$resource'];

  function tasksService($resource) {
    // Tasks service logic
    // ...

    // Public API
    return $resource('/api/tasks/:taskId', {
      taskId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  } 
})();

