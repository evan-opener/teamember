'use strict';

(function () {
  // Tasks Controller Spec
  describe('Tasks Controller Tests', function () {
    // Initialize global variables
    var TasksController,
      $scope,
      $httpBackend,
      $stateParams,
      $location,
      Tasks,
      fakeTask;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Tasks_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      Tasks = _Tasks_;
      
      fakeTask = new Tasks({
        _id: '012345abcdef',
        title: 'Task title',
        content: 'Task content'
      });

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;

      // Initialize the Tasks controller.
      TasksController = $controller('TasksController', {
        $scope: $scope
      });
    }));

    describe('$scope.find()', function () {
      var sampleTask;
      beforeEach(function () {
        sampleTask = [fakeTask];
      });
      
      it('should return an array with atleast on task', inject(function (){
        $httpBackend.expectGET('/api/tasks').response(sampleTask);
        
        $scope.find();
        $httpBackend.flush();
        
        expect($scope.tasks).toEqualData(sampleTask);
      }));
    });
    
    describe('$scope.create()', function () {
      var sampleTaskData;
      beforeEach(function () {
        sampleTaskData = {
          title: fakeTask.title,
          content: fakeTask.content
        };
        
        $scope.title = fakeTask.title;
        $scope.content = fakeTask.content;
        
        spyOn($location, 'path');
      });
      
      it('should send a POST request, empty the from fields, and redirect to /tasks', inject(function () {
        $httpBackend.expectPOST('/api/tasks', sampleTaskData).response(fakeTask);
        
        $scope.create(true);
        
        $httpBackend.flush();
        
        expect($scope.title).toBe('');
        expect($scope.content).toBe('');
        
        expect($location.path.call.mostRecent().args[0]).toBe('/tasks');
      }));
    });
    
    describe('$scope.delete()', function () {
      it('should send DELETE request and the posts array should be empty', inject(function () {
        $scope.tasks = [fakeTask];
        $httpBackend.expectDELETE('/api\/tasks\/([0-9a-f]{12}$/').respond(204);
        
        $scope.delete(fakeTask);
        $httpBackend.flush();
        
        expect($scope.posts.length).toBe(0);
        
      }));
    });
  });
}());
