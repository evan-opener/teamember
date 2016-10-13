'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/**
 * Project Schema
 */
var ProjectSchema = new Schema({
  // Project model fields
  id: Schema.ObjectId,
  projectName: {
    type: String,
    default: '',
    trim: true,
    required: 'The project name can\'t be blank'
  },
  projectCode: {
    type: String,
    default: '',
    trim: true,
    //Uncommet if the project code is required mandartory
    //require: 'The project code can\'t be blank'
  },
  description: {
    type: String,
    default: 'Project description here',
    trim: true
  },
  //projectStage: [],
  /*
  teamMembers: {
    PM: String,
    Members: [],
  },
  */
  tasks: Number,
});

mongoose.model('Project', ProjectSchema);
