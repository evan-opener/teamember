(function () {
  'use strict';

  angular
    .module('project')
    .controller('ProjectListController', ProjectListController);

  ProjectListController.$inject = ['ProjectService'];

  function ProjectListController(ProjectService) {
    var vm = this;

    vm.projects = ProjectService.query();
  }
})();
