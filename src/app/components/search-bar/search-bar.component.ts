import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/root.reducer';

import { FETCH_REPOS_REQUEST } from '../../constants/action-types';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  public query: string = '';
  public lastQuery: any = null;
  constructor(
    private store: Store<AppState>
  ) {}

  public handleSearch(e) {
    e.preventDefault();
    if(this.lastQuery === this.query) return;

    this.lastQuery = this.query;
    this.store.dispatch({type: FETCH_REPOS_REQUEST, payload: this.query});
  }

}
