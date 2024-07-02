import { NgTemplateOutlet, UpperCasePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { MaterialsModule } from '../materials/materials.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, MaterialsModule, NgTemplateOutlet, UpperCasePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private _dialog: MatDialog, private _snack: MatSnackBar) {
    this.People.Initialize();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // const _tyler = this.People.List.find(
    //   (person) => person.Name.toUpperCase() === 'TYLER'
    // );
    // this.People.Selected.Execute(_tyler);
    // this.Timer.Launch(_tyler);
  }

  @ViewChild('AddPersonTemplate', { static: true })
  add_person_ref!: TemplateRef<any>;

  People = {
    List: <Person[]>[],
    Initialize: () => {
      let ls_people = localStorage.getItem(LS_Key.People);
      if (!!ls_people) {
        this.People.List = JSON.parse(ls_people) as Person[];
        return;
      }
      this.People.List = [];
      this.People.Set_Storage();
    },
    Set_Storage: () => {
      localStorage.setItem(LS_Key.People, JSON.stringify(this.People.List));
    },
    Add_Person: {
      Name: <string>'',
      Execute: async () => {
        const save = await firstValueFrom<boolean>(
          this._dialog
            .open(this.add_person_ref, { disableClose: true })
            .afterClosed()
        );
        if (
          !!save &&
          this.People.List.findIndex(
            (person) => person.Name === this.People.Add_Person.Name
          ) === -1
        ) {
          this.People.List.push({
            Name: this.People.Add_Person.Name,
            Minutes: null,
            Seconds: null,
            Completed: Completion.NA,
          });
          this.People.Set_Storage();
        }
        this.People.Add_Person.Name = '';
      },
    },
    Remove_Person: (person: Person) => {
      const person_index = this.People.List.findIndex(
        (entry) => entry === person
      );
      if (person_index !== -1) {
        this.People.List.splice(person_index, 1);
        this.People.Set_Storage();
        new Audio('../assets/dumpster.ogg').play();
      }
    },
    Selected: {
      Person: <Person>{ Name: null, Minutes: null, Seconds: null },
      Execute: (person: Person) => {
        console.log(person);
        this.People.Selected.Person = person;
        this.Timer.Set(person.Minutes, person.Seconds);
      },
      Set_Time: (minutes: number, seconds: number) => {
        this.People.Selected.Person.Minutes = minutes;
        this.People.Selected.Person.Seconds = seconds;
        const person_index = this.People.List.findIndex(
          (person) => person.Name === this.People.Selected.Person.Name
        );
        this.People.List[person_index].Minutes = minutes;
        this.People.List[person_index].Seconds = seconds;
        this.People.Set_Storage();
      },
    },
    Reset: () => {
      for (let i = 0; i < this.People.List.length; i++) {
        this.People.List[i].Completed = Completion.NA;
      }
      this.People.Set_Storage();
    },
  };

  @ViewChild('TimerTemplate', { static: false }) timer_ref: TemplateRef<any>;
  Timer = {
    Code: <[number, number, number, number]>[null, null, null, null],
    Set: (minutes: number, seconds: number) => {
      if (!!minutes) {
        const minute_digits = minutes
          .toString()
          .split('')
          .map((digit) => Number(digit));
        switch (minute_digits.length) {
          case 2:
            this.Timer.Code[0] = minute_digits[0];
            this.Timer.Code[1] = minute_digits[1];
            break;
          case 1:
            this.Timer.Code[1] = minute_digits[0];
            console.log(this.Timer.Code);
            break;
        }
      }
      if (!!seconds) {
        const second_digits = seconds
          .toString()
          .split('')
          .map((digit) => Number(digit));
        switch (second_digits.length) {
          case 2:
            this.Timer.Code[2] = second_digits[0];
            this.Timer.Code[3] = second_digits[1];
            break;
          case 1:
            this.Timer.Code[2] = 0;
            this.Timer.Code[3] = second_digits[0];
            break;
        }
      }
    },
    Launch: (person: Person) => {
      this.Timer.Set(person.Minutes, person.Seconds);
      console.log(this.Timer.Code);
      this._dialog
        .open(this.timer_ref)
        .afterClosed()
        .subscribe((should_save: boolean) => {
          if (!!should_save) {
            console.log(this.Timer.Code);
            console.log(
              Number(this.Timer.Code.slice(0, 2).join('')),
              Number(this.Timer.Code.slice(2, 4).join(''))
            );
            this.People.Selected.Set_Time(
              Number(this.Timer.Code.slice(0, 2).join('')),
              Number(this.Timer.Code.slice(2, 4).join(''))
            );
          }
          this.Timer.ClearTime();
        });
    },
    AddTime: (digit: number) => {
      const reverse_index = this.Timer.Code.findIndex(
        (str_digit) => !!!str_digit
      );
      if (reverse_index === -1) {
        console.log(this.Timer.Code);
        return;
      }
      this.Timer.Code.shift();
      this.Timer.Code.push(digit);
    },
    ClearTime: () => {
      this.Timer.Code = [null, null, null, null];
    },
    DigitSplit: (
      minutes: number,
      seconds: number
    ): [number, number, number, number] => {
      const digit_array = <[number, number, number, number]>[
        null,
        null,
        null,
        null,
      ];
      const str_minutes = `${minutes}`;
      if (str_minutes.length >= 2) {
        digit_array.splice(
          0,
          2,
          Number(str_minutes[0]),
          Number(str_minutes[1])
        );
      } else {
        digit_array.splice(1, 1, minutes);
      }
      const str_seconds = `${seconds}`;
      if (str_seconds.length >= 2) {
        digit_array.splice(
          2,
          2,
          Number(str_seconds[0]),
          Number(str_seconds[1])
        );
      } else {
        digit_array.splice(3, seconds);
      }
      return digit_array;
    },
  };

  Actions = {
    Skip: (person: Person) => {
      person.Completed = Completion.Skipped;
      console.log(person);
    },
    Start: (person: Person) => {
      if (this.Microwave.Sabotage.Vent || this.Microwave.Sabotage.Interior) {
        this.Microwave.List.push(...this.Microwave.List.splice(0, 1));
        this._snack.open(
          `${
            !!this.Microwave.Sabotage.Vent
              ? 'There was too much debris in the vent...'
              : ''
          } ${
            !!this.Microwave.Sabotage.Interior
              ? 'A fork was left in the microwave...'
              : ''
          }`,
          'OK',
          { duration: 50000 }
        );
        return;
      }
      person.Completed = Completion.InProgress;
    },
    Complete: (person: Person) => {
      person.Completed = Completion.Completed;
      const person_index = this.Microwave.List.findIndex(
        (person_entry) => person_entry.Name === person.Name
      );
      if (person_index !== -1) {
        this.Microwave.List.splice(person_index, 1);
      }
      if (this.Microwave.List.length === 0) {
        this.Configuration.CookStatus = CookStatus.Completed;
      }
    },
  };

  @ViewChild('MicrowaveVentTemplate', { static: true })
  microwave_vent_ref: TemplateRef<any>;
  @ViewChild('MicrowaveInteriorTemplate', { static: true })
  microwave_interior_ref: TemplateRef<any>;

  Microwave = {
    List: <Person[]>[],
    Search: (mouse_event: MouseEvent, menu: 'Vent' | 'Interior') => {
      mouse_event.preventDefault();
      mouse_event.stopPropagation();
      let template_ref: TemplateRef<any>;
      switch (menu) {
        case 'Vent':
          template_ref = this.microwave_vent_ref;
          break;
        case 'Interior':
          template_ref = this.microwave_interior_ref;
          break;
      }
      if (!!!template_ref) {
        return;
      }
      this._dialog.open(template_ref, {
        panelClass: 'custom-dialog-action-list',
        position: {
          left: `${mouse_event.clientX}px`,
          top: `${mouse_event.clientY}px`,
        },
        width: '125px',
      });
    },
    Shuffle: () => {
      const person_list = this.People.List.map((person) => person);
      for (let i = person_list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = person_list[i];
        person_list[i] = person_list[j];
        person_list[j] = temp;
      }
      this.Microwave.List = person_list;
      this.Microwave.Sabotage.Execute(Sabotage.Random);
    },
    Start: () => {
      this.Configuration.CookStatus = CookStatus.Cookin;
    },
    Sabotage: {
      Vent: <boolean>false,
      Interior: <boolean>false,
      Execute: (sabotage: Sabotage) => {
        switch (sabotage) {
          case Sabotage.Vent:
            return;
          case Sabotage.Interior:
            return;
          default: {
            // random
            this.Microwave.Sabotage.Vent = [true, false][
              Math.floor(Math.random() * 2)
            ];
            this.Microwave.Sabotage.Interior = [true, false][
              Math.floor(Math.random() * 2)
            ];
          }
        }
      },
    },
  };

  get CompletionEnum(): typeof Completion {
    return Completion;
  }

  CookStatusEnum: typeof CookStatus = CookStatus;

  alert(input: string) {
    alert(input);
  }

  Configuration = {
    CookStatus: <CookStatus>CookStatus.Idle,
  };
}

enum LS_Key {
  People = 'People',
}

enum Completion {
  NA = 'N/A',
  Skipped = 'Skipped',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

enum CookStatus {
  Idle = 'Idle',
  Cookin = 'Cookin',
  Completed = 'Completed',
}

enum Sabotage {
  Vent = 'Vent',
  Interior = 'Interior',

  Random = 'Random',
}

interface Person {
  Name: string;
  Minutes: number;
  Seconds: number;
  Completed: Completion;
}
