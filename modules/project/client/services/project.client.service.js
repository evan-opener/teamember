//PrOJECT service used to communicate Tasks REST endpoints
(function () {
  'use strict';

  angular
    .module('project')
    .factory('ProjectService', ProjectService);

  ProjectService.$inject = ['$resource'];

  function ProjectService($resource) {
    return $resource('api/project/:projectId', {
      projectId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
