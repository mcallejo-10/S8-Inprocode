import { ChangeDetectorRef, Component, inject, signal, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput, EventSourceInput } from '@fullcalendar/core';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import 'bootstrap-icons/font/bootstrap-icons.css'; // needs additional webpack config!

import { EventService } from '../../services/event.service';
import { calendarEvent } from '../../interfaces/calendarEvent';
import { LoadingBarComponent } from '../../shared/loading-bar/loading-bar.component';




@Component({
  selector: 'app-full-calendar',
  imports: [LoadingBarComponent , FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
   eventService = inject(EventService);


  events: EventInput[] = [];

  constructor(private router: Router) {}

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [
      dayGridPlugin, 
      interactionPlugin,
      timeGridPlugin,
    ],
    
    events: this.events, 
    dateClick: (arg: DateClickArg) => this.handleDateClick(arg),
    eventClick: (arg) => this.handleEventClick(arg),
    headerToolbar: {
      start: 'title',           
      center: '',               
      end: 'prev,next today dayGridMonth,timeGridWeek,timeGridDay'
    },
    height: 'auto', 
    contentHeight: 'auto',
    aspectRatio: 0.7,
  };



  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data: calendarEvent[]) => {
        console.log('Events loaded:', data);
        
        this.events = data.map(event => ({
          id: event.id?.toString(),
          title: event.title, 
          start: this.eventService.formatDate(new Date(event.startAt)),
          end: event.endAt ? this.eventService.formatDate(new Date(event.endAt)) : undefined,  
          description: event.description, 
          color: event.color || undefined
        }));
        this.calendarOptions.events = this.events; 
      },
      error: (error: any) => {
        console.error('Error loading events:', error);
      },
      complete: () => {
        console.log('Event loading complete.');
      }
    });
  }


  handleDateClick(arg: DateClickArg) {
    const date = arg.date; // Fecha seleccionada
    console.log('date:', date);
    
    this.eventService.selectedDate()?.set(date);   
    this.router.navigate(['/addEvent']);
  }

  handleEventClick(clickInfo: EventClickArg) {
    const eventId = clickInfo.event.id;
    this.router.navigate(['/editEvent', eventId]);
  }
}