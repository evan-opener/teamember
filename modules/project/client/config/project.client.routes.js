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
        controller: 'ProjectListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Projects List'
        }
      })
      .state('project.create', {
        url: '/create',
        templateUrl: 'modules/project/client/views/form-project.client.view.html',
        controller: 'ProjectController',
        controllerAs: 'vm',
        resolve: {
          projectResovle: newProject
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Project Create - Input project basic information'
        }
      })
      .state('project.edit', {
        url: '/:projectId/edit',
        templateUrl: 'modules/project/client/views/form-project.client.view.html',
        controller: 'ProjectController',
        controllerAs: 'vm',
        resolve: {
          projectResovle: getProject
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit Project {{ projectResolve.name }} information'
        }
      })
      .state('project.view', {
        url: '/:projectId',
        templateUrl: 'modules/project/client/views/view-project.client.view.html',
        controller: 'viewProjectController',
        controllerAs: 'vm',
        resolve: {
          projectResovle: getProject
        },
        data: {
          pageTitle: 'Project {{ projectResolve.name }}'
        }
      });
  }

  getProject.$inject = ['$stateParams', 'ProjectService'];

  function getProject($stateParams, ProjectService) {
    return ProjectService.get({
      projectId: $stateParams.projectId
    }).$promise;
  }

  newProject.$inject = ['ProjectService'];

  function newProject(ProjectService) {
    return new ProjectService();
  }
})();
