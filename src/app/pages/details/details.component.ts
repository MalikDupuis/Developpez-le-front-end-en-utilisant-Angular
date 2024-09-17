import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, partition } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  title: string = 'Name Country';

  public olympics$: Observable<Olympic | undefined> = of(undefined); // Correct type
  public totalAthleteCount: number = 0;
  public totalMedalsCount: number = 0;
  view: [number, number] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Medal Number';
  timeline: boolean = true;

  public chartData: any[] = [];
tooltipDisabled: boolean = true;

  constructor(private route: ActivatedRoute,
    private olympicService: OlympicService 
  ) { }

  ngOnInit(): void {
    const olympicId = +this.route.snapshot.params['id']; // Ensure it's a number with + operator
    
    if (olympicId) {
      this.olympics$ = this.olympicService.getOlympicsById(olympicId);
  
      this.olympics$.subscribe(olympic => {
        if (olympic) {
          olympic.participations.forEach(p => {
            this.totalAthleteCount += p.athleteCount;
          })
          olympic.participations.forEach(p => {
            this.totalMedalsCount += p.medalsCount;
          })
          // Transform the data into the multi-series format
          const multi = olympic.participations.map(participation => ({
            name: olympic.country,  // Country name
            series: olympic.participations.map(p => ({
              name: p.year.toString(), // Year as string
              value: p.medalsCount // Number of medals as value
            }))
          }));
  
          // Assign multi to the chartData
          this.chartData = multi;
          console.log('Multi-series chart data:', multi);
  
        } else {
          console.log('Olympic not found');
        }
      });
    } else {
      console.log('Invalid Olympic ID');
    }
  }
  

}
