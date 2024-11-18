import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { TheatreService } from '../../services/theatre.service';



@Component({
  selector: 'app-chartjs',
  standalone: true,
  imports: [CommonModule, CanvasJSAngularChartsModule],
  templateUrl: './chartjs.component.html',
  styleUrl: './chartjs.component.scss'
})
export class ChartjsComponent {

  theatreService = inject(TheatreService)

  getAccessibility() {
    this.theatreService.getAccessibility().subscribe((data:number[]) => {
      console.log(data);
      
    })
  }
  chartOptions = {
    title: {
      text: "Basic Column Chart in Angular"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "Apple",  y: 10  },
        { label: "Orange", y: 15  },
        { label: "Banana", y: 25  },
        { label: "Mango",  y: 30  },
        { label: "Grape",  y: 28  }
      ]
    }]                
  };

}
