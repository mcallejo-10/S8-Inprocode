import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal,  } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Theatre } from '../interfaces/theatre';
import { Accessibility, SeatCount } from '../interfaces/charts';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {
  private myAppUrl: string;
  private myApiUrl: string;

  //signal
  // seat = signal(this.getSeatCount() || []);
  
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

  getAccessibility():Observable<Accessibility[]> {
    return this.http.get<Accessibility[]>(`${this.myAppUrl}${this.myApiUrl}/accessibility`)
  }

  getSeatCount() {
    return this.http.get<SeatCount[]>(`${this.myAppUrl}${this.myApiUrl}/seat-count`)
  }
  // // getSeats(){
  //   const datos = rxResource(async () => {
  //     const respuesta = await fetch(`${this.myAppUrl}${this.myApiUrl}/seat-count`);
  //     return respuesta.json();
  //   });
  //   datos.value.subscribe((data: any) => console.log(data));
  // }
  

}
