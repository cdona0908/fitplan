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
        name: String
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
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        exercises: [Exercise]
        exercise(_id: ID!): Exercise
        routines: [Routine]
        routine(_id: ID!): Routine
        me: User
        user(username: String!): User
        users: [User]
    }
    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveExercise(_id: ID!): User
        removeExercise(_id: ID!): User
        addRoutine(name: String!): User
        deleteRoutine(_id: ID!): User
        addWorkout(routineId: ID!, workoutName: String!, weight: Int, sets: Int, reps: Int, time: Int ): Routine
        deleteWorkout(_id: ID!): Routine
    }
`;
module.exports = typeDefs;