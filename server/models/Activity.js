const { Schema, model } = require('mongoose');

const activitySchema = new Schema(
    {
        exercises: [
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