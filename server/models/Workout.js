const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const workoutSchema = new Schema(
    {
        
        workoutName: {
            type: String,
            required: 'What is the name of your Exercise?',
            minlength: 1,
            maxlength: 60
        },
        weight: {
            type: Number
        },
        sets: {
            type: Number
        },
        reps: {
            type: Number
        },
        time: {
            type: Number
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);


module.exports = workoutSchema;