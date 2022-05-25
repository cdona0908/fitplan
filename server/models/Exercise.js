const { Schema, model } = require('mongoose');
const { Exercise } = require('.');
const dateFormat = require('../utils/dateFormat');

const exerciseSchema = new Schema(
    {
      title: {
        type: String
      },
      text: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
      },
      image: {
        type: String
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );
  
  const Exercise = model('Exercise', exerciseSchema);
  
  module.exports = Exercise;