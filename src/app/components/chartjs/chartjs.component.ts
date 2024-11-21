import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CanvasJS, CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { TheatreService } from '../../services/theatre.service';
import { Accessibility, SeatCount } from '../../interfaces/charts';
import { LoadingBarComponent } from '../../shared/loading-bar/loading-bar.component';



@Component({
  selector: 'app-chartjs',
  imports: [LoadingBarComponent, CommonModule, CanvasJSAngularChartsModule],
  templateUrl: './chartjs.component.html',
  styleUrl: './chartjs.component.scss'
})

export class ChartjsComponent {

  theatreService = inject(TheatreService)
  yes: number = 0;
  no: number = 0;
  private cdr = inject(ChangeDetectorRef);
  chartOptions: any;
  seatChartOptions: any;
  seatCount: any;

  ngOnInit() {
    this.getAccessibility();
    this.getData();
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
      },
      error: (err) => {
        console.error("Error cargando datos", err);
      }
    });
  }

  getData() {
    this.seatCount = this.theatreService.getSeatCount().subscribe({
      next: (data: SeatCount[]) => {
        this.countSeatChart(data[0])
      },
      error: (err) => {
        console.error("Error cargando datos", err);
      }
    });
  }


  countSeatChart(seatCount: SeatCount) {
    console.log("antes de la grafica", seatCount);
    console.log("antes de la grafica", seatCount.less_than_100);
    this.seatChartOptions = {
      title: {
        text: "Número de localidades"
      }, axisY: {
        title: "Número de teatros"
      },
      axisX: {
        title: "Número de butacas"
      },
      animationEnabled: true,
      data: [{
        type: "column",
        showInLegend: false,        
        legendText: "Número de butacas",
        
       
        dataPoints: [
          { x: 1, y: parseInt(seatCount.less_than_100), label: 'Menos de 100' },
          { x: 2, y: parseInt(seatCount.between_100_and_300), label: 'Entre 100 y 299' },
          { x: 3, y: parseInt(seatCount.between_300_and_500), label: 'Entre 300 y 499'},
          { x: 4, y: parseInt(seatCount.between_500_and_999) , label: 'Entre 500 y 999'},
          { x: 5, y: parseInt(seatCount.greater_than_1000), label: 'Más de 1000' },
        ]
      }]
    }
    this.cdr.detectChanges();

    console.log("Datos de seatChartOptions", this.seatChartOptions.data[0].dataPoints);

  }
}
