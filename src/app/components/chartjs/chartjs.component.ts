import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CanvasJS, CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { TheatreService } from '../../services/theatre.service';
import { Accessibility, SeatCount } from '../../interfaces/charts';
import { LoadingBarComponent } from '../../shared/loading-bar/loading-bar.component';



@Component({
  selector: 'app-chartjs',
  standalone: true,
  imports: [LoadingBarComponent, CommonModule, CanvasJSAngularChartsModule],
  templateUrl: './chartjs.component.html',
  styleUrl: './chartjs.component.scss'
})

export class ChartjsComponent implements AfterViewInit {

  theatreService = inject(TheatreService)
  yes: number = 0;
  no: number = 0;
  private cdr = inject(ChangeDetectorRef);
  chartOptions: any;
  seatChartOptions: any;
  seatCount: any;
ngOnInit() {
  this.getAccessibility();
  this.countSeatChart();
}
  ngAfterViewInit() {
  }

  getAccessibility() {
    this.theatreService.getAccessibility().subscribe({
      next: (data: Accessibility[]) => {
        this.yes = data[1]?.count;
        this.no = data[0]?.count;

        this.chartOptions = {
          animationEnabled: true,
          title: {
            text: "Teatros accesibles para personas con discapacidad"
          },
          data: [{
            type: "pie",
            startAngle: -90,
            indexLabel: "{name}: {y}",
            yValueFormatString: "#,###.##'%'",
            dataPoints: [
              { y: this.yes, name: "SI" },
              { y: this.no, name: "NO" }
            ]
          }]
        };
        this.cdr.detectChanges();
        // CanvasJS.Chart?.renderAll();
      },
      error: (err) => {
        console.error("Error cargando datos", err);
      }
    });
  }

  countSeatChart() {
    this.theatreService.getSeatCount().subscribe({
      next: (count: SeatCount[]) => {
        this.seatCount = count[0];

        console.log(count[0]);

        this.seatChartOptions = {
          title: {
            text: "Número de teatros por cantidad de butacas"
          },
          axisY: {
            title: "Número de butacas"
          },
          data: [
            {
              color: "#D090FF",
              type: "column",
              showInLegend: true,
              legendMarkerType: "triangle",
              legendText: "Número de teatros",
              dataPoints: [
                { x: 1, y: 6, label: "menos de 100" },
                { x: 2, y: this.seatCount.between_100_and_300, label: "Entre 100 y 299" },
                { x: 3, y: this.seatCount.between_300_and_500, label: "Entre 300 y 499" },
                { x: 4, y: this.seatCount.between_500_and_999, label: "entre 500 y 1000" },
                { x: 5, y: this.seatCount.greater_than_1000, label: "Mas de 1000" },

              ]
            }
          ]
        }
        console.log("Datos de seatChartOptions  111 ", this.seatChartOptions.data[0].dataPoints);


      }, error: (err) => {
        console.error("Error cargando datos", err);
      }

    })
  }
}
