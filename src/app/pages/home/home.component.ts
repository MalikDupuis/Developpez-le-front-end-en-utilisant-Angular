import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';
import { PieChart } from 'src/app/core/models/PieChart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

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
  public chartData: PieChart[] = [];

  private subscription: Subscription | null = null;

  constructor(
    private olympicService: OlympicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    
    this.subscription = this.olympics$.subscribe(olympics => {
      const chartData = olympics.map(olympic => {
        const totalMedals = (olympic.participations || []).reduce((acc, curr) => acc + (curr.medalsCount || 0), 0);
        return {
          name: olympic.country,
          value: totalMedals,
          id: olympic.id
        };
      });

      this.chartData = chartData;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    const e = this.chartData.find(({ name }) => name == data.name);
    if (e) {
      this.router.navigateByUrl(`/details/${e.id}`);
    }
  }
}
