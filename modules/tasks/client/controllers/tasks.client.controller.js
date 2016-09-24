(function() {
  'use strict';

  angular
    .module('tasks')
    .controller('TasksController', TasksController);

  TasksController.$inject = ['$scope'];

  function TasksController($scope) {
    var vm = this;

    // Tasks controller logic
    // ...

    init();

    function init() {
    }
  }
})();
