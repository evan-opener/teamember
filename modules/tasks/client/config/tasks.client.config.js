(function() {
  'use strict';

  // Tasks module config
  angular
    .module('tasks')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Config logic
    Menus.addMenuItem('topbar', {
      title: 'Tasks',
      state: 'tasks',
      type: 'dropdown',
      roles: ['user', 'admin']
    });
    
    Menus.addSubMenuItem('topbar', 'tasks', {
      title: 'Tasks list',
      state: 'task-list'
    });
    
    Menus.addSubMenuItem('topbar', 'tasks', {
      title: 'Create a New Task',
      state: 'task-create'
    });
  }
})();
