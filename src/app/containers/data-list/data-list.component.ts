import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/root.reducer';
import { ReposState } from '../../reducers/repos.reducer';
import { GeneratorState } from '../../reducers/generator.reducer';

import { GithubService } from '../../providers/github/github.service';

import { LOAD_MORE_REQUEST, TOGGLE_DRAG_STATE } from '../../constants/action-types';

@Component({
  selector: 'data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnDestroy {
  public storeSubscription: Subscription;
  public idMap: number[];
  public repos: Repo[];
  public nextPage: any;
  public isFetching: boolean;

  constructor(
    private store: Store<AppState>,
    private github: GithubService
  ) {
    this.storeSubscription = Observable.combineLatest(
      this.store.select('repos'),
      this.store.select('generator'),
      (repos: ReposState, generator: GeneratorState) => {
        let { list, nextPage, isFetching } = repos;
        let { idMap } = generator;
        return { list, nextPage, isFetching, idMap };
      }
    )
    .subscribe(model => {
      this.repos = model.list;
      this.nextPage = model.nextPage;
      this.isFetching = model.isFetching;
      this.idMap = model.idMap;
    });
  }

  public ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  public handleDragState(e) {
    this.store.dispatch({ type: TOGGLE_DRAG_STATE });
  }

  public getLanguageStyle(language: string) {
    return this.github.getLanguageStyle(language);
  }

  public isInComparison(id: number) {
    return !this.idMap.includes(id);
  }

  public loadMore() {
    this.store.dispatch({ type: LOAD_MORE_REQUEST, payload: this.nextPage });
  }

}
