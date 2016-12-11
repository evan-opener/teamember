(function() {
  'use strict';

  angular
    .module('project')
    .controller('ProjectViewController', ProjectViewController);

  /* @ngInject */
  ProjectViewController.$inject = ['$scope', '$state', 'Authentication', 'projectResovle', 'Admin', '$rootScope', '$location'];

  function ProjectViewController($scope, $state, Authentication, project, Admin, $rootScope, $location) {
    var vm = this;

    vm.project = project;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};

    vm.select = select;

    // Use $rootScope to project selection
    function select() {
      $rootScope.projectName = vm.project.projectName;
      console.log($rootScope.projectName);
      $location.url('/');
    }
  }
})();
