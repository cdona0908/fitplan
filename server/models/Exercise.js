const { Schema, model } = require('mongoose');
const categorySchema =require('./Category');

const dateFormat = require('../utils/dateFormat');

const exerciseSchema = new Schema(
    {
      exerciseTitle: {
        type: String
      },
      exerciseDescription: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
      },
      image: {
        type: String
      },
      categories: [ categorySchema],
    },
    {
      toJSON: {
        getters: true
      }
    }
  );
  
  const Exercise = model('Exercise', exerciseSchema);
  
  module.exports = Exercise;