import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CanvasJS, CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { TheatreService } from '../../services/theatre.service';
import { Accessibility } from '../../interfaces/charts';
import { LoadingBarComponent } from '../../shared/loading-bar/loading-bar.component';



@Component({
  selector: 'app-chartjs',
  standalone: true,
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


  ngOnInit() {
    this.getAccessibility();
  }

  getAccessibility() {
    this.theatreService.getAccessibility().subscribe({
      next: (data: Accessibility[]) => {
        this.yes = data[1]?.count;
        this.no = data[0]?.count;

        // Configurar las opciones del gráfico
        this.chartOptions = {
          animationEnabled: true,
          title: {
            text: "SON ACCESIBLES PARA SILLAS DE RUEDAS"
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

        console.log("Datos de chartoptions",this.chartOptions);
        console.log("datos de la api",this.yes,this.no);

        this.cdr.detectChanges();
        CanvasJS.Chart?.renderAll();
      },
      error: (err) => {
        console.error("Error cargando datos", err);
      }
    });
  }
}
