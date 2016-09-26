(function () {
  'use strict';

  angular
    .module('tasks')
    .factory('Tasks', Tasks);

  Tasks.$inject = ['$resource'];

  function Tasks($resource) {
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

