'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/**
 * Tasks Schema
 */
var TasksSchema = new Schema({
  // Tasks model fields
  // ...
  ID: {
    type: String,
  },
  author: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    require: 'Task subject cannot be blank!'
  },
  content: {
    type: String,
    require: 'Task content cannot be blank!'
  },
  assignTo: {
    type: String,
    require: 'The task need a executor!'
    /*ref: 'User'*/
  },
  dueDate: {
    type: Date,
    require: 'Please give a due date!'
  }
  /*finish: {
    type: Date,
    default: '' 
  }*/
});

mongoose.model('Tasks', TasksSchema);
