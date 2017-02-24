import { ActionReducer, Action } from '@ngrx/store';

import {
  ADD_TO_COMPARISON,
  REMOVE_FROM_COMPARISON
} from '../constants/action-types';

export interface GeneratorState {
  list: Repo[];
  idMap: number[]
}

const initialState = {
  list: [],
  idMap: []
};

export const generatorReducer: ActionReducer<GeneratorState> = (state: GeneratorState = initialState, action: Action) => {
  switch(action.type) {
    case ADD_TO_COMPARISON:
      return Object.assign({}, state, { list: [...state.list, action.payload], idMap: [...state.idMap, action.payload.id] });

    case REMOVE_FROM_COMPARISON:
      return Object.assign(
        {},
        state,
        {
          list: state.list.filter(repo => repo.id !== action.payload),
          idMap: state.idMap.filter(id => id !== action.payload)
        }
      );

    default:
      return state;
  }
}