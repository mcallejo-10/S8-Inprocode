import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChartjsComponent } from './components/chartjs/chartjs.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MapComponent } from './components/map/map.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'graficos', component: ChartjsComponent },
    { path: 'full-calendar', component: CalendarComponent },
    { path: 'map', component: MapComponent },
    { path: 'add', component: AddEditComponent },
    { path: 'edit/:id', component: AddEditComponent },
    {path: '***', redirectTo: '', pathMatch:'full'}

];
