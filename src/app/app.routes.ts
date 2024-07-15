import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

const title = (route: string): string => `Time Machine / ${route}`;

export const routes: Routes = [
  { path: 'home', component: AboutComponent, title: title('Home') },
  { path: 'about', component: HomeComponent, title: title('About') },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
