import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MaterialsModule } from './materials/materials.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MaterialsModule, MatToolbarModule, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private mat_icon_registry: MatIconRegistry) {}

  ngOnInit(): void {
    this.mat_icon_registry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
