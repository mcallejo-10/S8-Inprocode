import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core'; // useful for typechecking
import { FullCalendarModule } from '@fullcalendar/angular'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

// import { INITIAL_EVENTS, createEventId } from './event-utils';


@Component({
    selector: 'app-full-calendar',
    imports: [FullCalendarModule],
    templateUrl: './full-calendar.component.html',
    styleUrl: './full-calendar.component.scss'
})
export class FullCalendarComponent {
    calendarVisible = signal(true);
    currentEvents = signal<EventApi[]>([]);

    calendarOptions = signal<CalendarOptions>({

        // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
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


  constructor(private changeDetector: ChangeDetectorRef) {
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
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
        const title = prompt('Please enter a new title for your event');
        const calendarApi = selectInfo.view.calendar;
    
        calendarApi.unselect(); // clear date selection
    
        if (title) {
          calendarApi.addEvent({
            // id: createEventId(),
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
          });
        }
      }
    }