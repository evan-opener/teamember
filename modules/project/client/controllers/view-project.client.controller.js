(function() {
  'use strict';

  angular
    .module('project')
    .controller('ProjectViewController', ProjectViewController);

  /* @ngInject */
  ProjectViewController.$inject = ['$scope', '$state', 'Authentication', 'projectResovle', 'Admin'];

  function ProjectViewController($scope, $state, Authentication, project, Admin) {
    var vm = this;

    vm.project = project;
    vm.tasks = project.tasks;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};

  }
})();
