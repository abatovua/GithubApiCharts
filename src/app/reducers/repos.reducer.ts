import { ActionReducer, Action } from '@ngrx/store';

import {
  FETCH_REPOS_REQUEST,
  FETCH_REPOS_SUCCESS,
  FETCH_REPOS_ERROR,
  LOAD_MORE_REQUEST,
  LOAD_MORE_SUCCESS,
  LOAD_MORE_ERROR
} from '../constants/action-types';

export interface ColorMapItem {
  color: string;
  backgroundColor: string;
}

export interface ColorMap {
  defaultColor: ColorMapItem;
  [key: string]: ColorMapItem;
}

export interface ReposState {
  list: Repo[];
  isFetching: boolean;
  loadError: boolean;
  nextPage: any;
  colorMap: ColorMap
}

const initialState = {
  list: [],
  isFetching: false,
  loadError: false,
  nextPage: null,
  colorMap: {
    defaultColor: {
      backgroundColor: 'rgba(0, 0, 0, 0.87)',
      color: 'rgba(255, 255, 255, 1)'
    }
  }
};

export const reposReducer: ActionReducer<ReposState> = (state: ReposState = initialState, action: Action) => {
  switch (action.type) {

    case FETCH_REPOS_REQUEST:
      return Object.assign({}, state, { isFetching: true, loadError: false, nextPage: null, list: [] });

    case FETCH_REPOS_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          list: action.payload.items,
          isFetching: false,
          nextPage: action.payload.link.next,
          colorMap: action.payload.colorMap
        }
      );

    case FETCH_REPOS_ERROR:
      return Object.assign({}, state, { isFetching: false, loadError: true, list: [] });

    case LOAD_MORE_REQUEST:
      return Object.assign({}, state, { isFetching: true, loadError: false });

    case LOAD_MORE_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          list: [...state.list, ...action.payload.items],
          isFetching: false,
          nextPage: action.payload.link.next,
          colorMap: action.payload.colorMap
        }
      );

    case LOAD_MORE_ERROR:
      return Object.assign({}, state, { isFetching: false, loadError: true });

    default:
      return state;
  }
};