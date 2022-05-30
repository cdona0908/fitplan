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

    type Activity {
        routineName: String,
        exerciseTitle: String
        weight: Int
        sets: Int
        reps: Int
        time: Int

    }

    type Routine {
        _id: ID
        routineName: String
        username: String
        activities: [Activity]
    }  


    type User {
        _id: ID
        username: String
        email: String
        routines: [Routine]        
        
    }

    type Query {
        exercises: [Exercise]
        users: [User]
    }
`;

module.exports = typeDefs;