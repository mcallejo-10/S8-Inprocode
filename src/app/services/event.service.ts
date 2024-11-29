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
  
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/teatro';     
   }

   getAllEvents():Observable<calendarEvent[]> {
    return this.http.get<calendarEvent[]>(`${this.myAppUrl}${this.myApiUrl}/events`);
   }

   deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/event/${id}`)
   }

   saveEvent(event: Event):Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}/event`, event)
   }
   updateEvent(id: number, event: Event): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/event/${id}`, event)
   }

   getEvent(id: number):Observable<Event> {
    return this.http.get<Event>(`${this.myAppUrl}${this.myApiUrl}/event/${id}`)
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

}
