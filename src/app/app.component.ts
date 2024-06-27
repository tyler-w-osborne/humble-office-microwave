import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { MaterialsModule } from './materials/materials.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MaterialsModule, MatToolbarModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'humble-office-microwave';
}
