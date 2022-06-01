import { useReducer } from 'react';
import { ADD_ROUTINE, SAVE_EXERCISE } from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_ROUTINE:
      return {
        ...state,
        routines: [...action.routines]
      };

    case SAVE_EXERCISE:
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