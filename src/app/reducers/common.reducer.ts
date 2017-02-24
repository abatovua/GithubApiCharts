import { ActionReducer, Action } from '@ngrx/store';

import {
  TOGGLE_DRAG_STATE
} from '../constants/action-types';

export interface CommonState {
  isDragging: boolean;
}

const initialState = {
  isDragging: false
};

export const commonReducer: ActionReducer<CommonState> = (state: CommonState = initialState, action: Action) => {
  switch(action.type) {
    case TOGGLE_DRAG_STATE:
      return Object.assign({}, state, { isDragging: !state.isDragging });

    default:
      return state;
  }
}