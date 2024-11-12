import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Theatre } from '../interfaces/theatre';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/teatro';
   }

   getListTheatress():Observable<Theatre[]> {
    return this.http.get<Theatre[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }

   deleteTheatre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }
}
