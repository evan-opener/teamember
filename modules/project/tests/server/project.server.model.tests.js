'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Project = mongoose.model('Project');

/**
 * Globals
 */
var user, project;

/**
 * Unit tests
 */
describe('Project Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() { 
      project = new Project({
        // Add model fields
        // ...
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
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      return project.save(function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) { 
    Project.remove().exec();
    User.remove().exec();

    done();
  });
});
