import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { ToastrService } from 'ngx-toastr';
import { calendarEvent } from '../../interfaces/calendarEvent';
import { LoadingBarComponent } from '../../shared/loading-bar/loading-bar.component';
import { dateSelectionJoinTransformer } from '@fullcalendar/core/internal';

@Component({
  selector: 'app-event-form',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, FormsModule, LoadingBarComponent],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss'
})


export class EventFormComponent {
  // eventService = inject(EventService);
  errorMessage: string = '';
  form: FormGroup;
  loading: boolean = false;
  id: number;
  date: any;  
  action: string = 'Agregar ';


  constructor(private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required),
      color: new FormControl('#3e6565', Validators.required)
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'))
    console.log('id', this.id);

  }


  ngOnInit(): void {
    if (this.id != 0) {
      this.action = 'Editar '
      this.getEvent(this.id)
    } else {
      console.log('selectedDate', this.eventService.selectedDate()?.value);
      
      this.form.patchValue({
        start: this.eventService.selectedDate()
      })
    }
  }
  addEvent() {
    if (this.form.invalid) {
      console.log(this.form.value);
      this.errorMessage = 'Formulario incorrecto, revise los campos'
    } else {
      this.errorMessage = '';
      const currentEvent: calendarEvent = {
        title: this.form.value.title,
        description: this.form.value.description,
        startAt: this.form.value.start,
        endAt: this.form.value.end,
        color: this.form.value.color
      }
      this.loading = true;
      if (this.id != 0) {
        currentEvent.id = this.id;
        this.eventService.updateEvent(this.id, currentEvent).subscribe({
          next: () => {
            this.toastr.success('Evento actualizado con éxito', 'Evento actualizado');
            this.router.navigate(['/full-calendar']);
          },
          error: (error: any) => {
            this.errorMessage = 'Debe rellenar todos los campos requeridos';
            console.error('Error loading events:', error);
          }
        }); } else {
        this.eventService.addEvent(currentEvent).subscribe({
          next: () => {
            this.toastr.success('Evento añadido con éxito', 'Evento añadido');
            this.router.navigate(['/full-calendar']);
          },
          error: (error: any) => {
            this.errorMessage = 'Debe rellenar todos los campos requeridos';
            console.error('Error loading events:', error);
          }
        });
        this.loading = false;
      }
    }
  }

  getEvent(id: number) {
    this.loading = true;
    this.eventService.getEvent(id).subscribe({
      next: (data: calendarEvent) => {

        this.form.setValue({
          title: data.title,
          description: data.description,
          start: this.eventService.formatDate(new Date(data.startAt || '')),
          end: this.eventService.formatDate(new Date(data.endAt || '')),
          color: data.color
        })
        if (id == 0) {
          console.log('selectedDate', this.eventService.selectedDate()?.value);
          this.form.patchValue({
            
            start: this.eventService.selectedDate()?.value,
          })
        }
      },
      error: (error: any) => {
        console.error('Error loading events:', error);
      },
      complete: () => {
        console.log('Event loading complete.');
      }
    });
    this.loading = false;
  }

}
