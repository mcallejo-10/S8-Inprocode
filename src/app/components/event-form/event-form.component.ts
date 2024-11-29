import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-form',
  imports: [RouterLink , ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss'
})
export class EventFormComponent {
  errorMessage: string = '';
  form: FormGroup;
  loading: boolean = false;
  id: number;
  action: string = 'Agregar ';


  constructor(private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required),
      color: new FormControl('#3e6565')
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'))

  }


    ngOnInit(): void {
      if (this.id != 0) {
        this.action = 'Editar '
       
      }
    }
  addEvent(){
    console.log('Evento añadido');
    
  } 
  openForm(eCalendar: EventCalendar | null, newDate: String | null){

    if (eCalendar == null && newDate != null){

      this.isUpdateMode = false;

      this.formCalendar.patchValue({
        title: 'New Event',
        start: newDate,
        end: newDate,
      })

    } else {
      this.isUpdateMode = true;

      this.eventId = eCalendar?.id ?? null;

      this.form.patchValue({
        title: eCalendar?.title,
        description: eCalendar?.description,
        start: this.eventService.formatDate(new Date(eCalendar?.start || '')),
        end: this.eventService.formatDate(new Date(eCalendar?.end || '')),
        color: eCalendar?.color,
      })

    }

    this.formCalendar.markAllAsTouched();

    const modalElement = document.getElementById('calendarModal');

    if (modalElement) {
      const bootstrap: any = (window as any).bootstrap;
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
}
}
