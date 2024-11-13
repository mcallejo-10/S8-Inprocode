import { Component, inject } from '@angular/core';
import { Theatre } from '../../interfaces/theatre';
import { RouterLink } from '@angular/router';
import { TheatreService } from '../../services/theatre.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
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

  deleteTheatre(id: number) {
    this.loading = true;
    this.theatreService.deleteTheatre(id).subscribe(() => {
      this.getListTheatres();
      this.loading = false;
      // this.toastr.success('Producto eliminado con éxito', 'Producto eliminado')
      

    })
  }
}
