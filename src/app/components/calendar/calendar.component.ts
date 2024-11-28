import { ChangeDetectorRef, Component, inject, signal, ViewChild, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
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
  calendarVisible = signal(true);
  currentEvents = signal<EventApi[]>([]);
  storedEvents: calendarEvent[] = [];
  eventService = inject(EventService);
  
  calendarOptions = signal<CalendarOptions>({
    initialEvents: this.storedEvents,
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      interactionPlugin,
      bootstrap5Plugin
    ],
    themeSystem: 'bootstrap5',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)

  });

  @ViewChild('calendar', { static: false }) calendarComponent!: FullCalendarComponent;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.eventService.getAllEvents().subscribe((data) => {
      console.log(data);
      
      this.storedEvents = data.map((event) => ({
        title: event.title,
        description: event.description,
        startAt: event.startAt,
        endAt: event.endAt,
        allDay: event.allDay ?? false,
      }));
    });
  }

  ngAfterViewInit() {
    if (this.calendarComponent) {
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.addEventSource(this.storedEvents); // Añade los eventos cuando el calendario está listo
    }
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }


  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Introduce el título del evento');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }
}