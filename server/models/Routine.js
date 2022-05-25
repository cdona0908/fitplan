const { Schema, model } = require('mongoose');

const routineSchema = new Schema(

);
    
const Routine = model('Routine', routineSchema);
    
module.exports = Routine;