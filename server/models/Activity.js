const { Schema, model } = require('mongoose');

const activitySchema = new Schema(
    {
        routineName: {
            type: Schema.Types.ObjectId,
            ref: 'Routine',
        },
        exerciseTitle: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Exercise'
            }            
        ],
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
        }
    }
);

const Activity = model('Activity', activitySchema);

module.exports = Activity;