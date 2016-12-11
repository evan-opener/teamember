(function() {
  'use strict';

  angular
    .module('project')
    .controller('ProjectController', ProjectController);

  ProjectController.$inject = ['$scope', '$state', 'Authentication', 'projectResovle', 'Admin'];

  function ProjectController ($scope, $state, Authentication, project, Admin) {
    var vm = this;

    vm.users = Admin.query();
    vm.project = project;
    vm.tasks = vm.project.tasks;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing project
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.project.$remove($state.go('project.list'));
      }
    }

    // Create/update logic
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-error-check-validity', 'vm.form.projectForm');
        return false;
      }

      if (vm.project._id) {
        vm.project.$update(sucessCallback, errorCallback);
      } else {
        vm.project.tasks = [];
        vm.project.$save(sucessCallback, errorCallback);
      }

      function sucessCallback(res) {
        $state.go('project.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

  }
})();
