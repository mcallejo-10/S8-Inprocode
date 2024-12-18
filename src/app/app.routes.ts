import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChartjsComponent } from './components/chartjs/chartjs.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MapComponent } from './components/map/map.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { CRUDComponent } from './components/crud/crud.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'graficos', component: ChartjsComponent },
    { path: 'full-calendar', component: CalendarComponent },
    { path: 'map', component: MapComponent },
    { path: 'crud', component: CRUDComponent },
    { path: 'add', component: AddEditComponent },
    { path: 'edit/:id', component: AddEditComponent },
    { path: 'addEvent', component: EventFormComponent },
    { path: 'editEvent/:id', component: EventFormComponent },
    {path: '***', redirectTo: '', pathMatch:'full'}

];
