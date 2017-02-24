import { Component, OnDestroy } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/root.reducer';
import { GeneratorState } from '../../reducers/generator.reducer';
import { CommonState } from '../../reducers/common.reducer';

import { ChartComponent } from '../../components/chart/chart.component'

import { GithubService } from '../../providers/github/github.service';

import { ADD_TO_COMPARISON, REMOVE_FROM_COMPARISON } from '../../constants/action-types';

@Component({
  selector: 'chart-generator',
  templateUrl: './chart-generator.component.html',
  styleUrls: ['./chart-generator.component.scss']
})
export class ChartGeneratorComponent implements OnDestroy {
  public storeSubscription: Subscription;
  public repos: Repo[] = [];
  public isDragging: boolean;
  public maxItems: number = 8;
  constructor(
    private store: Store<AppState>,
    private github: GithubService,
    public modal: MdDialog
  ) {
    this.storeSubscription = Observable.combineLatest(
      this.store.select('generator'),
      this.store.select('common'),
      (generator: GeneratorState, common: CommonState) => {
        let { list } = generator;
        let { isDragging } = common;
        return { list, isDragging };
      }
    )
    .subscribe(model => {
      this.repos = model.list;
      this.isDragging = model.isDragging;
    });
  }

  public ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  public addToComparison(data) {
    let repo = Object.assign({}, data.dragData);
    this.store.dispatch({ type: ADD_TO_COMPARISON, payload: repo });
  }

  public removeFromComparison(id: number) {
    this.store.dispatch({ type: REMOVE_FROM_COMPARISON, payload: id });
  }

  public getLanguageStyle(language: string) {
    return this.github.getLanguageStyle(language);
  }

  public getContainerStyle() {
    return this.isDragging && this.available() ? { backgroundColor: 'rgba(255,205,210 ,1)' } : {};
  }

  public available() {
    return this.maxItems - this.repos.length;
  }

  public openModal() {
    this.modal.open(ChartComponent, { data: this.repos });
  }

}
