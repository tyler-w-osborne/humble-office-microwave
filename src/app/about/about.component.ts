import { NgTemplateOutlet, UpperCasePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialsModule } from '../materials/materials.module';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FormsModule, MaterialsModule, NgTemplateOutlet, UpperCasePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit, AfterViewInit {
  constructor(private _dialog: MatDialog, private _snack: MatSnackBar) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
