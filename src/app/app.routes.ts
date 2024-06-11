import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { TimsHeroesComponent } from "./tims-heroes/tims-heroes.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'tims-heroes',
    component: TimsHeroesComponent,
    title: 'Tims Heroes page'
  },
];
