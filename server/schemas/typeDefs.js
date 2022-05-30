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

    type Query {
        exercises: [Exercise]
    }
`;

module.exports = typeDefs;