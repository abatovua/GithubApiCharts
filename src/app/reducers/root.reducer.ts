import { combineReducers, ActionReducer, Action } from '@ngrx/store';

import { reposReducer, ReposState } from './repos.reducer';
import { generatorReducer, GeneratorState } from './generator.reducer';
import { commonReducer, CommonState } from './common.reducer';

export interface AppState {
  repos: ReposState,
  generator: GeneratorState,
  common: CommonState
}

const reducers = {
  repos: reposReducer,
  generator: generatorReducer,
  common: commonReducer
};

const rootReducer: ActionReducer<AppState> = combineReducers(reducers);

export function root(state: any, action: Action) {
  return rootReducer(state, action);
}