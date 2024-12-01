import { Component, inject } from '@angular/core';
import { Theatre } from '../../interfaces/theatre';
import { RouterLink } from '@angular/router';
import { TheatreService } from '../../services/theatre.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { LoadingBarComponent } from "../../shared/loading-bar/loading-bar.component";

@Component({
  selector: 'app-crud',
  imports: [RouterLink, LoadingBarComponent],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CRUDComponent {

  listTheatres: Theatre[] = [];
  loading: boolean = false;
  theatreService = inject(TheatreService)
  toastr = inject(ToastrService)

  ngOnInit() {
    this.getListTheatres();
  }

  getListTheatres() {
    this.loading = true;
    this.theatreService.getListTheatres().subscribe((data: Theatre[]) => {
      this.listTheatres = data;
      this.loading = false;
    })
  }

  deleteTheatre(id: number) {
    this.loading = true;
    this.theatreService.deleteTheatre(id).subscribe(() => {
      this.getListTheatres();
      this.loading = false;
      this.toastr.warning(`Teatro eliminado con éxito`, 'Teatro eliminado')
    })
  }
}

