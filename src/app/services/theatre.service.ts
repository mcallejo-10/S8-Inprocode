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

   getListTheatres():Observable<Theatre[]> {
    return this.http.get<Theatre[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }

   deleteTheatre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }

   saveTheatre(theatre: Theatre):Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, theatre)
   }
   updateTheatre(id: number, theatre: Theatre): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, theatre)
   }

   getTheatre(id: number):Observable<Theatre> {
    return this.http.get<Theatre>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  getAccessibility():Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/accessibility`)
  }


}
