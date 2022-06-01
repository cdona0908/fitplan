import { gql } from '@apollo/client';

export const QUERY_EXERCISES = gql`
    query exercises {
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
`;

export const QUERY_USER = gql`
    query User ($username: String!) {
        user(username: $username) {
            _id
            username
            email
            exercises {
              _id
              exerciseTitle
              exerciseDescription
              image
              categories {
                categoryName
              }
            }
            routines {
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

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            exercises {
              _id
              exerciseTitle
              exerciseDescription
            }       
          
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
        }   }
    }
`;