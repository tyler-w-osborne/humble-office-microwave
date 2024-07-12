import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { MicrowaveSvgComponent } from './microwave-svg/microwave-svg.component';

const title = (route: string): string => `Nuke Machine / ${route}`;

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: title('Home') },
  { path: 'about', component: AboutComponent, title: title('About') },
  {
    path: 'microwave-svg',
    component: MicrowaveSvgComponent,
    title: title('Microwave-SVG'),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
