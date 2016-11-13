(function() {
  'use strict';

  angular
    .module('project')
    .controller('ProjectController', ProjectController);

  ProjectController.$inject = ['$scope', '$state', 'Authentication', 'projectResovle', 'Admin'];

  function ProjectController ($scope, $state, Authentication, project, Admin) {
    var vm = this;

    vm.user = Admin.query();
    vm.project = project;
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
      };

      if (vm.project._id) {
        vm.project.$update(successCallback, errorCallback);
      } else {
        vm.project.$save(sucessCallback, errorCallback);
      }

      function sucessCallback(res) {
        $state.go('project.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

//    vm.tasks = TasksService.query();
//    vm.taskQty = vm.tasks.length;

//    // Project controller logic
//    // dummy projects
//    $scope.projects = [{
//      projectName: 'Sydney NRWL',
//      projectCode: 'AU010',
//      description: 'Sydney Northwest link by MTR',
//      projectStage: 1,
//      teamMembers: {
//        'PM': 'Charles-Antoine.D',
//        'STM': 'Evan XU',
//        'LocalPM': 'Qi Ding'
//      },
//      tasks: 12
//    }, {
//      projectName: 'Shanghai Metro Line 13',
//      projectCode: 'SH013',
//      description: 'Shanghai Metro Line 13 first batch',
//      projectStage: 3,
//      teamMembers: {
//        PM: 'Leo Xu',
//        STM: 'Min Wu'
//      },
//      tasks: 6
//    }];
//
//    init();
//
//    function init() {
//    }
  }
})();
