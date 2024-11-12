import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChartjsComponent } from './components/chartjs/chartjs.component';
import { FullCalendarComponent } from './components/full-calendar/full-calendar.component';
import { MapComponent } from './components/map/map.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'graficos', component: ChartjsComponent },
    { path: 'full-calendar', component: FullCalendarComponent },
    { path: 'map', component: MapComponent },
    {path: '***', redirectTo: '', pathMatch:'full'}

];
