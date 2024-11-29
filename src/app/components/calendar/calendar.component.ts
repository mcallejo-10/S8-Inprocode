import { ChangeDetectorRef, Component, inject, signal, ViewChild, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput, EventSourceInput } from '@fullcalendar/core';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { EventService } from '../../services/event.service';
import { apiResponse, calendarEvent } from '../../interfaces/calendarEvent';
import { LoadingBarComponent } from '../../shared/loading-bar/loading-bar.component';




@Component({
  selector: 'app-full-calendar',
  imports: [LoadingBarComponent , FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  calendarVisible = signal(true);
  currentEvents = signal<EventApi[]>([]);
  storedEvents: calendarEvent[] = [];

  
  @ViewChild('calendar', { static: false }) calendarComponent!: FullCalendarComponent;

  constructor(private changeDetector: ChangeDetectorRef, private eventService: EventService) { }

  events: EventInput[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: this.events, 
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: (arg) => this.handleEventClick(arg),
    headerToolbar: {
      start: 'title',           
      center: '',               
      end: 'today prev,next'
    },
    contentHeight: 'auto'
  };

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data: calendarEvent[]) => {
        this.events = data.map(event => ({
          id: event.id.toString(),
          title: event.title, 
          start: this.eventService.formatDate(new Date(event.startAt)),
          end: event.endAt ? this.eventService.formatDate(new Date(event.endAt)) : undefined,  
          description: event.description, 
          color: event.color || undefined
        }));
      },
      error: (error: any) => {
        console.error('Error loading events:', error);
      },
      complete: () => {
        console.log('Event loading complete.');
      }
    });
  }
  

  handleDateClick(arg: DateClickArg): void {

    const selectedDate = arg.dateStr;

    // if (this.eventModalComponent) {
    //   this.eventModalComponent.openModal(null, selectedDate);
    // }
  }

  handleEventClick(arg: EventClickArg): void{
    // Construimos el objeto calendarEvent con los datos del evento
    const clickedEvent = arg.event;

    const eventData: calendarEvent = {
      id: parseInt(clickedEvent.id, 10),
      title: clickedEvent.title,
      description: clickedEvent.extendedProps['description'] || '',
      startAt: clickedEvent.start?.toISOString() || '',
      endAt: clickedEvent.end?.toISOString() || '',
      color: clickedEvent.backgroundColor || '#FF5733'
    };

    // Abre el modal en modo de edición con los datos del evento
    // if (this.eventModalComponent) {
    //   this.eventModalComponent.openModal(eventData, null);
    // }
  }

  onEventUpdated(eCalendar: calendarEvent) {
    this.loadEvents(); 
  }




}


//   handleCalendarToggle() {
//     this.calendarVisible.update((bool) => !bool);
//   }


//   handleEventClick(clickInfo: EventClickArg) {
//     if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//       clickInfo.event.remove();
//     }
//   }

//   handleEvents(events: EventApi[]) {
//     this.currentEvents.set(events);
//     this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
//   }

//   handleDateSelect(selectInfo: DateSelectArg) {
//     const title = prompt('Introduce el título del evento');
//     const calendarApi = selectInfo.view.calendar;

//     calendarApi.unselect(); // clear date selection

//     if (title) {
//       calendarApi.addEvent({
//         title,
//         start: selectInfo.startStr,
//         end: selectInfo.endStr,
//         allDay: selectInfo.allDay
//       });
//     }
//   }
// }