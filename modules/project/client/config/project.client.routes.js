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
        url: '/project',
        template: '<ui-view/>',
        data: {
          //define which role can access
          roles : ['user', 'admin']
        }
      })
      .state('project.list', {
        url: '',
        templateUrl: 'modules/project/client/views/project.client.view.html',
        controller: 'ProjectController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Projects List'
        }
      })
      .state('project.create', {
        url: '/create',
        templateUrl: 'modules/project/client/views/form-project.client.view.html',
        controller: 'projectController',
        controllerAs: 'vm',
        resovle: {
          projectResovle: newProject
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Project Create'
        }
        
    })
    ;
  }

  newProject.$inject = ['ProjectService'];

  function newProject(ProjectService) {
    return new ProjectService();
  }
})();
