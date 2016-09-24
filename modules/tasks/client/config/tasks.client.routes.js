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
      .state('task-create', {
        url: '/task-create',
        templateUrl: 'modules/tasks/client/views/task-create.client.view.html',
        controller: 'TaskcreateController',
        controllerAs: 'vm'
      })
      .state('tasks', {
        abstract: true,
        url: '<ui-view>',
        data: {
          roles: ['user', 'admin']
        }
      })
    
      .state('task-list', {
        url: '/task-list',
        templateUrl: 'modules/tasks/client/views/tasks.client.view.html',
        controller: 'TasksController',
        controllerAs: 'vm'
      });
  }
})();
