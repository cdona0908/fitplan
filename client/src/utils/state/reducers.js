import { useReducer } from 'react';
import { ADD_ROUTINES, ADD_EXERCISES } from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_ROUTINES:
      return {
        ...state,
        routines: [...action.routines]
      };

    case ADD_EXERCISES:
      return {
        ...state,
        exercises: [...action.exercises]
      };
    default:
      return state;
  }
};

export function useUserReducer(initialState) {
  return useReducer(reducer, initialState);
}