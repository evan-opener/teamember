(function () {
  'use strict';

  //Setting up route
  angular
    .module('project')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Project state routing
    $stateProvider
      .state('project', {
        abstract: true,
        url: '<ui-view>',
        data: {
          //define which role can access
          roles : ['user', 'admin']
        }
      })
      .state('project-list', {
        url: '',
        templateUrl: 'modules/project/client/views/project.client.view.html',
        controller: 'ProjectController',
        controllerAs: 'vm',
        
      });
  }
})();
