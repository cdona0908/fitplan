const { gql } = require('apollo-server-express');

const typeDefs = gql` 

    type Category {
        _id: ID
        categoryName: String        
    }

    type Exercise {
        _id: ID
        exerciseTitle: String
        exerciseDescription: String
        image: String
        categories: [Category]
    }     
    

    type User {
        _id: ID
        username: String
        email: String
        routines: [Routine]
        exercises: [Exercise]      
        
    }

    type Routine {
        _id: ID
        routineName: String
        createdAt: String
        workouts: [Workout]
    }

    type Workout {
        _id: ID
        workoutName: String
        weight: Int
        sets: Int
        reps: Int
        time: Int
        createdAt: String
    }

    type Query {
        exercises: [Exercise]
        users: [User]
        routines: [Routine]
    }
`;

module.exports = typeDefs;