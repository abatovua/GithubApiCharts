import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { GithubService } from '../providers/github/github.service';

import {
  FETCH_REPOS_REQUEST,
  FETCH_REPOS_SUCCESS,
  FETCH_REPOS_ERROR,
  LOAD_MORE_REQUEST,
  LOAD_MORE_SUCCESS,
  LOAD_MORE_ERROR
} from '../constants/action-types';

@Injectable()
export class ReposEffects {
  constructor(
    private actions$: Actions,
    private github: GithubService
  ) {
  }

  @Effect()
  getRepos$ = this.actions$
    .ofType(FETCH_REPOS_REQUEST)
    .map(action => action.payload)
    .switchMap(payload => this.github.searchRepos(payload)
      .map(res => ({ type: FETCH_REPOS_SUCCESS, payload: res }))
      .catch(() => Observable.of({ type: FETCH_REPOS_ERROR }))
    );

  @Effect()
  loadMoreRepos$ = this.actions$
    .ofType(LOAD_MORE_REQUEST)
    .map(action => action.payload)
    .switchMap(payload => this.github.loadMoreRepos(payload)
      .map(res => ({ type: LOAD_MORE_SUCCESS, payload: res }))
      .catch(() => Observable.of({ type: LOAD_MORE_ERROR }))
    );
}