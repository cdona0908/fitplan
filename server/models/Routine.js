const { Schema, model } = require('mongoose');

const routineSchema = new Schema(
    {
        routineName: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp)
        },
        activities: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Activity'
            }
        ],
    }
);
    
const Routine = model('Routine', routineSchema);
    
module.exports = Routine;