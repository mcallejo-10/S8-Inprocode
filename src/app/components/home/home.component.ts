import { Component, inject } from '@angular/core';
import { Theatre } from '../../interfaces/theatre';
import { TheatreService } from '../../services/theatre.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  listTheatres: Theatre[] = [];
  loading: boolean = false;
  theatreService = inject(TheatreService)

  ngOnInit() {
    this.getListTheatres();
  }

  getListTheatres() {
    this.loading = true;
    this.theatreService.getListTheatres().subscribe((data: Theatre[]) => {
      this.listTheatres = data;
      this.loading = false;
      console.log(data);

    })
  }

}
