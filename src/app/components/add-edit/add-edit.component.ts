import { Component } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TheatreService } from '../../services/theatre.service';
import { Theatre } from '../../interfaces/theatre';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})


export class AddEditComponent {

  errorMessage: string = '';
  form: FormGroup;
  loading: boolean = false;
  id: number;
  action: string = 'Agregar ';


  constructor(private fb: FormBuilder,
    private theatreService: TheatreService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      seat_count: new FormControl('', Validators.required),
      accessible: new FormControl('')
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'))

  }


  ngOnInit(): void {
    if (this.id != 0) {
      this.action = 'Editar '
      this.getTheatre(this.id)
    }
  }

  addTheatre() {
    if (this.form.invalid && this.form.touched) {
      this.errorMessage = 'Formulario incorrecto, revise los campos'
    } else {
      this.errorMessage = '';
      const theatre: Theatre = {
        name: this.form.value.name,
        address: this.form.value.address,
        phone: this.form.value.phone,
        seat_count: this.form.value.seat_count,
        accessible: !!this.form.value.accessible
      }

      this.loading = true;
      if (this.id != 0) {
        theatre.id = this.id;
        this.theatreService.updateTheatre(this.id, theatre).subscribe(() => {
          this.toastr.info(`${theatre.name} se ha actualizado con éxito`, 'Teatro actualizado');
          this.router.navigate(['/'])

        })

      } else {
        this.theatreService.saveTheatre(theatre).subscribe(() => {
          console.log(theatre);
          this.toastr.success(`${theatre.name} fue registrado con éxito`, 'Teatro registrado')
          this.router.navigate(['/'])
        })
      }
      this.loading = false;
    }
  }


  getTheatre(id: number) {
    this.loading = true;
    this.theatreService.getTheatre(id).subscribe((data: Theatre) => {
      this.form.setValue({
        name: data.name,
        address: data.address,
        phone: data.phone,
        seat_count: data.seat_count,
        accessible: data.accessible
      })
    })
    this.loading = false;

  }
}
