import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Color, id, LegendPosition } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  view: [number, number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  public olympics$: Observable<Olympic[]> = of([]);
  public chartData: any[] = [];

  constructor(private olympicService: OlympicService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe(olympics => {
      const chartData = olympics.map(olympic => {
        const totalMedals = (olympic.participations || []).reduce((acc, curr) => acc + (curr.medalsCount || 0), 0);
        return {
          name: olympic.country,
          value: totalMedals,
          id:olympic.id
        };
      });

      this.chartData = chartData;
    });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    const e = this.chartData.find(({name})=>name == data.name)
    this.router.navigateByUrl(`/details/${e.id}`);
  }
}
