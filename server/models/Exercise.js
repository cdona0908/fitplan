const { Schema, model } = require('mongoose');
const { Exercise } = require('.');
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
      categories: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Category'
        }
      ],
    },
    {
      toJSON: {
        getters: true
      }
    }
  );
  
  const Exercise = model('Exercise', exerciseSchema);
  
  module.exports = Exercise;