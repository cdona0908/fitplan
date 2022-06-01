const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const workoutSchema = require('./Workout')

const routineSchema = new Schema(
    {
        name: {
            type: String,
            required: 'Please give your routine a name!',
            minlength: 1,
            maxlength: 100
        },
        
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp)
        },
        workouts: [workoutSchema],
    },
    {
        toJSON: {
          getters: true
        }
    }
    
);
    
const Routine = model('Routine', routineSchema);
    
module.exports = Routine;