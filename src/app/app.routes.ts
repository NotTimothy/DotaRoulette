import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { TimsHeroesComponent } from "./tims-heroes/tims-heroes.component"
import {HeroChallengesComponent} from "./hero-challenges/hero-challenges.component";

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
  {
    path: 'hero-challenges/:hero',
    component: HeroChallengesComponent,
    title: 'Hero Challenges page'
  },
];
