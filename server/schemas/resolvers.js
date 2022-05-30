const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const {User, Exercise, Routine, Workout} = require('../models')

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('routines')
            .populate('exercises');  
        },
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('routines')
                .populate('exercises');  
      
              return userData;
            }
      
            throw new AuthenticationError('Not logged in');
        },        
        user: async (parent, { username }) => {
            return User.findOne({username})
            .select('-__v -password')
            .populate('routines')
            .populate('exercises');             
                           
        },
        routines: async () => {
           return Routine.find()
           .populate('workouts'); 
        },
        routine: async (parent, { _id }) => {
            return Routine.findOne({_id})            
            .populate('workouts');            
                           
        },
        exercises: async ()=>{
            return Exercise.find()
        },
        exercise: async (parent, { _id }) => {
            return Exercise.findOne({_id});     
                                             
        }, 
    
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            
      
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Wrong credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Wrong credentials');
            }
      
            const token = signToken(user);
            return { token, user };
        },
        saveExercise: async(parent, { _id }, context)=>{
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                  { _id: context.user._id },
                  { $addToSet: { exercises: _id } },
                  { new: true, runValidators: true }
                )
                .populate('exercises')
                .populate('routines');
        
                return updatedUser;
            }
        
            throw new AuthenticationError('Please log in');

        },
        removeExercise: async(parent, { _id }, context)=>{
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                  { _id: context.user._id },
                  { $pull: { exercises: _id } },
                  { new: true, runValidators: true }
                )
                .populate('exercises');               
        
                return updatedUser;
            }
        
            throw new AuthenticationError('Please log in');

        },
        addRoutine: async(parent, args, context) => {
            if (context.user) {
                const routine = await Routine.create({ ...args });
        
               const updatedUser = await User.findByIdAndUpdate(
                  { _id: context.user._id },
                  { $push: { routines: routine._id } },
                  { new: true }
                ).populate({
                    path: 'routines',
                    populate: [
                        {
                            path: 'workouts'
                        }                   
                                       
                    ]
                });
        
                return updatedUser;
            }
        
            throw new AuthenticationError('Please log in!');
        },
        addWorkout: async(parent, {routineId, workoutName, weight, sets, reps, time }, context) => {
            if (context.user) {
                        
               const updatedRoutine = await Routine.findByIdAndUpdate(
                  { _id: routineId },
                  { $push: { routines: {workoutName, weight, sets, reps, time} } },
                  { new: true, runValidators: true  }
                );
        
                return updatedRoutine;
            }
        
            throw new AuthenticationError('Please log in!');
        }       

    }
};
  
module.exports = resolvers;
  