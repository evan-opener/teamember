(function () {
  'use strict';

  angular
    .module('tasks')
    .controller('TasksListController', TasksListController);

  TasksListController.$inject = ['TasksService', '$rootScope'];

  function TasksListController(TasksService, $rootScope) {
    var vm = this;

    vm.tasks = TasksService.query();
//    if ($rootScope.projectName !== undefined & $rootScope.projectName !== null) {
//
//    }
    vm.projectName = $rootScope.projectName;
  }
})();
