(function () {
  'use strict';

  // Tasks controller
  angular
    .module('tasks')
    .controller('TasksController', TasksController);

  TasksController.$inject = ['$scope', '$state', 'Admin', 'Authentication', 'taskResolve', 'ProjectService'];

  function TasksController ($scope, $state, Admin, Authentication, task, ProjectService) {
    var vm = this;
    vm.users = Admin.query();
    vm.authentication = Authentication;
    vm.task = task;
    vm.projects = ProjectService.query();
    vm.task.startDate = new Date(vm.task.startDate);
    vm.task.dueDate = new Date(vm.task.dueDate);
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.dateType = 'date';

    // Remove existing Task
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.task.$remove($state.go('tasks.list'));
      }
    }

    // Save Task
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.taskForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.task._id) {
        vm.task.startDate = new Date(vm.task.startDate);
        vm.task.dueDate = new Date(vm.task.dueDate);
        vm.task.$update(successCallback, errorCallback);
      } else {
        vm.task.startDate = new Date(vm.task.startDate);
        vm.task.dueDate = new Date(vm.task.dueDate);
        vm.task.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('tasks.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
