import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'chart',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.scss']
})
export class ChartComponent {
  public viewBox = [700, 600];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Repository';
  public showYAxisLabel = true;
  public showLabels = true;
  public explodeSlices = false;
  public rawData: Repo[];
  public data: any;
  public currentCompareBy = 'score';
  public possibleCompareBy = ['score', 'forks', 'watchers'];
  public currentChartType = 'bar-vertical';
  public possibleChartTypes = [
    'bar-vertical',
    'bar-horizontal',
    'pie',
    'pie-advanced',
    'pie-grid',
    'tree-map'
  ];


  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    public modalRef: MdDialogRef<ChartComponent>
  ) {
    this.rawData = this.modalRef.config.data;
    this.data = this.formatData(this.rawData);
  }

  private formatData(rawData) {
    return this.possibleCompareBy.reduce((acc, field) => {

      acc[field] = rawData.reduce((result, repo) => {
        result.push({
          name: repo.name,
          value: repo[field]
        });
        return result;
      }, []);

      return acc;
    }, {});
  }

}
