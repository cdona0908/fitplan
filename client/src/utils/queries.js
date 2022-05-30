import { gql } from '@apollo/client';

export const QUERY_EXERCISES = gql`
    query exercises () {
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


