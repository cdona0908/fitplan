import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_EXERCISE = gql`
  mutation saveExercise($id: ID!) {
    saveExercise(_id: $id) {
      _id
      username
      email
      exercises {
        _id
        exerciseTitle
        exerciseDescription
        image
        categories {
          _id
          categoryName
        }
      }
    }
  }
`;

export const REMOVE_EXERCISE = gql`
  mutation removeExercise($_id: ID!) {
    removeExercise(_id: $_id) {
      _id
      username
      exercises {
        _id
        exerciseTitle
        exerciseDescription
        image
        categories {
          _id
          categoryName
        }
      }
    }
  }
`;

export const ADD_ROUTINE = gql`
  mutation addRoutine($name: String!) {
    addRoutine(name: $name) {
      _id
      username
      email
      routines {
        _id
        name
        createdAt
        workouts {
          _id
          workoutName
          weight
          sets
          reps
          time
          createdAt
        }
      }
    }
  }
`;

export const ADD_WORKOUT = gql`
  mutation addWorkout(
    $routineId: ID!
    $workoutName: String!
    $weight: Int
    $sets: Int
    $reps: Int
    $time: Int
  ) {
    addWorkout(
      routineId: $routineId
      workoutName: $workoutName
      weight: $weight
      sets: $sets
      reps: $reps
      time: $time
    ) {
      name
      _id
      createdAt
      workouts {
        _id
        workoutName
        weight
        sets
        reps
        time
        createdAt
      }
    }
  }
`;
