import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DndModule } from 'ng2-dnd';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import 'hammerjs';

import { GithubService } from './providers/github/github.service';
import { ColorService } from './providers/color/color.service';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { DataListComponent } from './containers/data-list/data-list.component';
import { ChartGeneratorComponent } from './containers/chart-generator/chart-generator.component';
import { ChartComponent } from './components/chart/chart.component';

import { root } from './reducers/root.reducer';

import { ReposEffects } from './effects/repos.effects';
import { CapitalisePipe } from './pipes/capitalise.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    SearchBarComponent,
    DataListComponent,
    ChartGeneratorComponent,
    ChartComponent,
    CapitalisePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(root),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    EffectsModule.run(ReposEffects),
    MaterialModule,
    FlexLayoutModule,
    DndModule.forRoot(),
    NgxChartsModule
  ],
  entryComponents: [
    ChartComponent
  ],
  providers: [
    GithubService,
    ColorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
