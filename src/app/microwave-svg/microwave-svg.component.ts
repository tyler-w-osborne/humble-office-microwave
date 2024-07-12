import { Component } from '@angular/core';

@Component({
  selector: 'app-microwave-svg',
  standalone: true,
  imports: [],
  templateUrl: './microwave-svg.component.html',
  styleUrl: './microwave-svg.component.css',
})
export class MicrowaveSvgComponent {
  Microwave = {
    Outline: `
      M0,200
      L500,200
      L500,500
      L0,500
      L0,0
    `,
    MainPanel: [
      `
      M0,250
      L400,250
      L400,500
      L50,500
      Q0,500 0,450
      L0,250
      `,
      `
      M27.5,277.5
      L372.5,277.5
      L372.5,472.5
      L27.5,472.5
      L27.5,277.5
      `,
      // `
      // M35,285
      // L365,285
      // L365,465
      // L35,465
      // L35,285
      // `,
    ],
    KeypadPanel: [
      `M400,250
      L500,250
      L500,450
      Q500,500 450,500
      L400,500
      L400,250`,
    ],
    Top: [
      `M50,200
      L450,200 
      C475,200 480,200 500,250
      L0,250
      C25,200 30,200 50,200`,
      `
      M400,210
      L470,210
      L482.5,240
      L410,240
      L400,210

      M410,215
      L417.5,235

      M420,215
      L427.5,235

      M430,215
      L437.5,235

      M440,215
      L447.5,235

      M450,215
      L457.5,235

      M460,215
      L467.5,235
      `,
    ],
  };
}
