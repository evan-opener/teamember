'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Tasks Schema
 */
var TaskSchema = new Schema({
  // Tasks model fields
  // ...
  ID: {
    type: String,
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  startDate: {
    type: Date,
    require: 'Please give a start date!'
  },
  title: {
    type: String,
    trim: true,
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


mongoose.model('Task', TaskSchema);
