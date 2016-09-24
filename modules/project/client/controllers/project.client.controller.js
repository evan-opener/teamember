(function() {
  'use strict';

  angular
    .module('project')
    .controller('ProjectController', ProjectController);

  ProjectController.$inject = ['$scope'];

  function ProjectController($scope) {
    var vm = this;

    // Project controller logic
    // dummy projects
    $scope.projects = [{
      projectName: 'Sydney NRWL',
      projectCode: 'AU010',
      description: 'Sydney Northwest link by MTR',
      projectStage: 1,
      teamMembers: {
        'PM': 'Charles-Antoine.D',
        'STM': 'Evan XU',
        'LocalPM': 'Qi Ding'
      },
      tasks: 12
    }, {
      projectName: 'Shanghai Metro Line 13',
      projectCode: 'SH013',
      description: 'Shanghai Metro Line 13 first batch',
      projectStage: 3,
      teamMembers: {
        PM: 'Leo Xu',
        STM: 'Min Wu'
      },
      tasks: 6
    }];

    init();

    function init() {
    }
  }
})();
