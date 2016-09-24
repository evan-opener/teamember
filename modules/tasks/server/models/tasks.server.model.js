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
    default: '',
    trim: true,
    require: 'Task name'
  },
  content: {
    type: String,
  },
  asignTo: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  dueDate: {
    type: Date,
    require: 'Please give a due date.'
  },
  finish: {
    type: Date,
    default: ''
  }
});

mongoose.model('Tasks', TasksSchema);
