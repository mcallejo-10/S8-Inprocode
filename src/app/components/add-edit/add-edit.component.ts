import { Component } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
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
  form: FormGroup
  constructor(private fb: FormBuilder,
    private theatreService: TheatreService,
    private router: Router, 
    private toastr: ToastrService,
  ) {

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      seat_count: new FormControl('', Validators.required),
      accessible: new FormControl(null)
    })
  }

  errorMessage: string = '';


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
        accessible: this.form.value.accessible
      }
      this.theatreService.saveTheatre(theatre).subscribe(() => {
        console.log(theatre);
        this.toastr.success(`${theatre.name} fue registrado con éxito`, 'Teatro registrado')
        this.router.navigate(['/'])
      })
    }

  }

}
