(function() {
  'use strict';

  // Project module config
  angular
    .module('project')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Config logic
    // add the project to menu
    Menus.addMenuItem('topbar', {
      title: 'Project',
      state: 'project',
      //define which role can usee this menu
      type: 'dropdown',
      roles: ['user', 'admin']
    });
    
    Menus.addSubMenuItem('topbar', 'project', {
      title: 'Projects list',
      state: 'project-list'
    });
    
    Menus.addSubMenuItem('topbar', 'project', {
      title: 'Create New Project',
      state: 'project-create'
    });
  }
})();
