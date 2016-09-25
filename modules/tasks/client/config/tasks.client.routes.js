(function () {
  'use strict';

  //Setting up route
  angular
    .module('tasks')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Tasks state routing
    $stateProvider
      .state('tasks', {
        abstract: true,
        url: '/tasks',
        templateUrl: '<ui-view/>',
        data: {
          roles: ['user', 'admin']
        }
      })
    
      .state('tasks.create', {
        url: '/create',
        templateUrl: 'modules/tasks/client/views/task-create.client.view.html',
        controller: 'TasksController',
        controllerAs: 'vm'
      })
      
      .state('tasks.list', {
        url: '',
        templateUrl: 'modules/tasks/client/views/tasks.client.view.html',
        controller: 'TasksController',
        controllerAs: 'vm'
      });
  }
})();
