import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import { config } from '../../config/index';

import { Observable, Subscription } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/root.reducer';
import { ReposState, ColorMap } from '../../reducers/repos.reducer';

import { ColorService } from '../color/color.service';


@Injectable()
export class GithubService {
  private storeSubscription: Subscription;
  private auth: string;
  private apiUrl: string = 'https://api.github.com';
  private colorMap: ColorMap;
  constructor(
    private http: Http,
    private color: ColorService,
    private store: Store<AppState>
  ) {
    this.auth = config.auth;
    this.storeSubscription = this.store.select('repos')
      .subscribe((repos: ReposState) => {
        this.colorMap = repos.colorMap;
      });
  }

  public searchRepos(query: string): Observable<any> {
    let url = `${this.apiUrl}/search/repositories?q=${query}`;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.auth
    });
    let options = new RequestOptions({ headers });

    return this.http.get(url, options)
      .map(response => {
        let link = this.parseLinkHeader(response.headers.get('link'));
        let items = response.json().items;
        let colorMap = this.getColorMap(items);
        return { link, items, colorMap };
      });
  }

  public loadMoreRepos(url: string): Observable<any> {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.auth
    });
    let options = new RequestOptions({ headers });

    return this.http.get(url, options)
      .map(response => {
        let link = this.parseLinkHeader(response.headers.get('link'));
        let items = response.json().items;
        let colorMap = this.getColorMap(items);
        return { link, items, colorMap };
      });

  }

  private parseLinkHeader(header) {
    let links = {};
    if (!header.length) {
      return links;
    }

    let parts = header.split(',');

    links = parts.reduce((acc, part) => {
      let section = part.split(';');
      if(section.length !== 2) return acc;
      let url = section[0].replace(/<(.*)>/, '$1').trim();
      let name = section[1].replace(/rel="(.*)"/, '$1').trim();
      acc[name] = url;
      return acc;
    }, {});

    return links;
  }

  public getLanguageStyle(language: string) {
    return language ? this.colorMap[language] : this.colorMap.defaultColor;
  }

  private getColorMap(repos: Repo[]) {
    return repos.reduce((acc, repo) => {
      let language = repo.language;

      if(!language || acc[language]) {
        return acc;
      }

      acc[language] = this.color.getColor(language);
      return acc;
    }, Object.assign({}, this.colorMap));
  }
}
