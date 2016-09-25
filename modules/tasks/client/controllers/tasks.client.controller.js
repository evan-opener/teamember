(function() {
  'use strict';

  angular
    .module('tasks')
    .controller('TasksController', TasksController);

  TasksController.$inject = ['$scope', 'Tasks', '$location'];

  function TasksController($scope, Tasks, $location) {
    var vm = this;

    // Tasks controller logic
    $scope.find = function () {
      $scope.tasks = Tasks.query();
    };

    $scope.taskCreate = function(isValid) {
      if(!isValid){
        return false;
      }
      
      var task = new Tasks({
        title: $scope.newTask.title,
        assignTo: $scope.newTask.assignTo,
        startDate: $scope.newTask.startDate,
        dueDate: $scope.newTask.dueDate,
        content: $scope.newTask.content
        
      });
      
      task.$save(function (response){
        
        $scope.newTask.title = '';
        $scope.newTask.assignTo = '';
        $scope.newTask.startDate = '';
        $scope.newTask.dueDate = '';
        $scope.newTask.content = '';
        $location.path('/tasks');
      }, function (errorResponse){
        
      });
    };
    
    $scope.delete = function(task){
      if(task){
        task.$remove();
        
        for(var i in $scope.tasks){
          if($scope.tasks[i] === task){
            $scope.tasks.splice(i,1);
          }
        }
      }
    };
    
    init();

    function init() {
    }
  }
})();
