(function () {
    'use strict';

    angular
        .module('project')
        .controller('viewProjectController', viewProjectController);

    /* @ngInject */
    viewProjectController.$inject = ['$scope', '$state', 'Authentication', 'projectResovle', 'Admin'];

  function viewProjectController($scope, $state, Authentication, project, Admin) {
    var vm = this;

    vm.project = project;
    vm.tasks = vm.project.tasks;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};

  };
})();
