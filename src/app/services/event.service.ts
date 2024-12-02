import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { calendarEvent } from '../interfaces/calendarEvent';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private myAppUrl: string;
  private myApiUrl: string;
  eventsList= signal<calendarEvent[]>([]);
  selectedEvent = signal<calendarEvent | null>(null);
  selectedDate = signal<any | null>(null);

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/teatro';    
    }

    setSelectedDate(date: any) {
      this.selectedDate.set(date);
    }

   updateSelectedEvent(event: calendarEvent | null) {
    this.selectedEvent.set(event);
   }

   getAllEvents():Observable<calendarEvent[]> {
    return this.http.get<calendarEvent[]>(`${this.myAppUrl}${this.myApiUrl}/events`);
   }

   deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/event/${id}`)
   }

   addEvent(event: calendarEvent):Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}/event`, event)
   }
   updateEvent(id: number, event: calendarEvent): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/event/${id}`, event)
   }

   getEvent(id: number):Observable<calendarEvent> {
    return this.http.get<calendarEvent>(`${this.myAppUrl}${this.myApiUrl}/event/${id}`)
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    
    console.log("format date", `${year}-${month}-${day}T${hours}:${minutes}`);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
    
  }

}
