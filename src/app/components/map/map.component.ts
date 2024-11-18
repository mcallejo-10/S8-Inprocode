import { Component, inject, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { TheatreService } from '../../services/theatre.service';
import { Theatre } from '../../interfaces/theatre';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  private map: any;
  private userMarker: L.Marker<any> | undefined;
  theatreService = inject(TheatreService);
  listTheatres: Theatre[] = [];
  markers: L.Marker[] = []; // Array para guardar referencias a los marcadores



  ngOnInit(): void {
    this.initMap();
  }

  private initMap() {
    this.map = L.map('map').setView([41.40217, 2.19326], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  getLocation() {
    this.cleanMap();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const coords: [number, number] = [position.coords.latitude, position.coords.longitude];

        if (this.userMarker) {
          this.userMarker = L.marker(coords);
        } else {
          this.userMarker = L.marker(coords).addTo(this.map)
            .bindPopup('Estás aquí')
            .openPopup();
          this.markers.push(this.userMarker);

        }

        this.map.setView(coords, 18)
      }, () => {
        alert('No se pudo obtener la geolocalización')
      }
      )
    } else {
      alert('Geolocalización no soportada por el navegador');
    }
  }

  getTheatresLocations() {

    this.cleanMap();
    const bounds = L.latLngBounds([]); // Define límites para ajustar la vista del mapa

    this.theatreService.getListTheatres().subscribe((data: Theatre[]) => {
      this.listTheatres = data;
      this.listTheatres.forEach(item => {
        if (item.latitude && item.longitude) {
          const marker = L.marker([item.latitude, item.longitude])
            .addTo(this.map)
            .bindPopup(`<b>${item.name}</b>`);
          this.markers.push(marker);
          bounds.extend([item.latitude, item.longitude]); // Amplía los límites con las coordenadas del marcador
        }
      })
      if (bounds.isValid()) {
        this.map.fitBounds(bounds, { padding: [50, 50] }); // Ajusta el mapa para incluir todos los marcadores
      }
    })
  }

  cleanMap() {
    this.markers.forEach(marker => {
      this.map.removeLayer(marker);
    });
    this.markers = [];
  }
}
