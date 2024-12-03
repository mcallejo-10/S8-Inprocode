import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { TheatreService } from '../../services/theatre.service';
import { Theatre } from '../../interfaces/theatre';

@Component({
    selector: 'app-map',
    imports: [],
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit{
  private map: any;
  private userMarker: L.Marker<any> | undefined;
  theatreService = inject(TheatreService);
  listTheatres: Theatre[] = [];
  filterTheatreList: Theatre[] = [];
  markers: L.Marker[] = []; 

  checkboxStates = {
    accessible: false,
    noAccessible: false,
  };
  

  customIcon = L.icon({
    iconUrl: 'assets/leaflet/marker-icon.png', // Ruta a tu icono
    shadowUrl: 'assets/leaflet/marker-shadow.png', // Ruta a la sombra
    iconSize: [25, 41], // Tamaño del icono
    iconAnchor: [12, 41], // Punto de anclaje
    popupAnchor: [1, -34], // Punto de anclaje del popup
    shadowSize: [41, 41], // Tamaño de la sombra
  });


  ngAfterViewInit(): void {
    this.initMap();
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  private initMap() {
    this.map = L.map('map').setView([41.40217, 2.19326], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  getLocation() {
    this.cleanMap();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const coords: [number, number] = [position.coords.latitude, position.coords.longitude];

        if (this.userMarker) {
        } else {
          this.userMarker = L.marker(coords, { icon: this.customIcon }).addTo(this.map)
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
    this.theatreService.getListTheatres().subscribe((data: Theatre[]) => {
      this.listTheatres = data;
      this.addMarkers(this.listTheatres);
    })
  }

  filterTheatres(event: Event) {
    const target = event.target as HTMLInputElement; 
    const value = target.value as 'accessible' | 'noAccessible'; 
    const isChecked = target.checked;

    this.checkboxStates[value] = isChecked;

    this.cleanMap();
    this.filterTheatreList = [];

    this.theatreService.getListTheatres().subscribe((data: Theatre[]) => { 
      let filteredList: Theatre[] = [];

      if (this.checkboxStates['accessible']) {
        filteredList = filteredList.concat(data.filter(item => item.accessible === true));
      } 

      if (this.checkboxStates['noAccessible']) {
        filteredList = filteredList.concat(data.filter(item => item.accessible === false));
      } 

      this.filterTheatreList = filteredList;
      this.addMarkers(this.filterTheatreList);
    })
  }


  addMarkers(theatres: Theatre[]) {  
    const bounds = L.latLngBounds([]); 
    theatres.forEach(item => {
      if (item.latitude && item.longitude) {
        const marker = L.marker([item.latitude, item.longitude], { icon: this.customIcon })
          .addTo(this.map)
          .bindPopup(`<b>${item.name}</b>`);
        this.markers.push(marker);
        bounds.extend([item.latitude, item.longitude]); 
      }
    })
    if (bounds.isValid()) {
      this.map.fitBounds(bounds, { padding: [20, 20] }); 
    }
  }

  cleanMap() {
    this.markers.forEach(marker => {
      this.map.removeLayer(marker);
    });
    this.markers = [];
  }
}
