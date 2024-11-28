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

}
