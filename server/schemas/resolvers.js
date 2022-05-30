const { AuthenticationError } = require('apollo-server-express');
//const { signToken } = require('../utils/auth');
const {User, Exercise, Routine} = require('../models')

const resolvers = {
    Query: {
        exercises: async ()=>{
            return Exercise.find()
        },
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('routines')
            .populate('exercises');             
                           
        },
        routines: async () => {
           return Routine.find()
           .populate('workouts'); 
        }
    }
};
  
module.exports = resolvers;
  