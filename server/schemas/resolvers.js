const { AuthenticationError } = require('apollo-server-express');
//const { signToken } = require('../utils/auth');
const {User, Exercise} = require('../models')

const resolvers = {
    Query: {
        exercises: async ()=>{
            return Exercise.find()
        }
    }
};
  
module.exports = resolvers;
  