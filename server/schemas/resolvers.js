const { AuthenticationError } = require('apollo-server-express');
//const { signToken } = require('../utils/auth');
const {User, Exercise} = require('../models')

const resolvers = {
    Query: {
        exercises: async ()=>{
            return Exercise.find()
        },
        users: async () => {
            return User.find()
            .select('-__v -password');             
                           
        },
    }
};
  
module.exports = resolvers;
  