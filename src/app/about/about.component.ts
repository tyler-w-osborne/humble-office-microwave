import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
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
      L0,450
      `,
      `
      M35,285
      L365,285
      L365,465
      L35,465
      L35,285
      `,
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
      M60,210
      L45,240
      `,
    ],
  };

  Microwave2 = {
    WholeImageOutline: `M0,0
      L100,0
      L100,100
      L0,100
      L0,0`,
    Top: `
      M15,0
      L85,0 
      C87.5,0 90,0 100,15
      L0,15
      C10,0 12.5,0 15,0
      `,
    WindowPanel: [
      `
      M15,15
      L85,15
      L16,20
      L0,20
      L0,4
      `,
      `
      M1,5
      L15,5
      L15,19
      L1,19
      L1,5
      `,
    ],
    KeypadPanel: `
      M16,4
      L20,4
      L20,20
      L16,20
      L16,4
    `,
    Keypad: [
      `
      M17,5
      L19,5
      L19,14
      L17,14
      L17,5
      M17,7
      L19,7
    `,
      `
      M17,16
      L19,16
      L19,19
      L17,19
      L17,16
    `,
    ],

    Rest: `
      M0,2
      L10,2
      M0,2.5
      L10,2.5

      M1,3.5
      L6,3.5
      Q6.5,3.5 6.5,4
      L6.5,9
      Q6.5,9.5 6,9.5
      L1,9.5
      Q.5,9.5 .5,9
      L.5,4
      Q.5,3.5 1,3.5

      M.75,3.75
      L6.25,3.75
      L6.25,9.25
      L.75,9.25
      L.75,3.75

      M7,3
      L9.5,3
      L9.5,7.5
      L7,7.5
      L7,3

      M7.25,3.25
      L9.25,3.25
      L9.25,7.25
      L7.25,7.25
      L7.25,3.25`,
  };
}
