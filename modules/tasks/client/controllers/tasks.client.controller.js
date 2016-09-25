(function() {
  'use strict';

  angular
    .module('tasks')
    .controller('TasksController', TasksController);

  TasksController.$inject = ['$scope', 'Tasks'];

  function TasksController($scope, Tasks) {
    var vm = this;

    // Tasks controller logic
    $scope.find = function () {
      $scope.tasks = Tasks.query();
    };

    init();

    function init() {
    }
  }
})();
