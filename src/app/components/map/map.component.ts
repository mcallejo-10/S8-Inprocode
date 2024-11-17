import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit{
  private map: any;
  private userMarker: L.Marker<any> | undefined;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(){
    this.map = L.map('map').setView([41.40217, 2.19326],13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }

}
