import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { MaterialsModule } from '../materials/materials.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, MaterialsModule, NgTemplateOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private _dialog: MatDialog) {
    this.People.Initialize();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //this.Timer.Launch();
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
      this.People.Set();
    },
    Set: () => {
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
            Time: null,
          });
          this.People.Set();
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
        this.People.Set();
      }
    },
    Selected: {
      Person: <Person>{ Name: null, Time: null },
      Execute: (person: Person) => {
        this.People.Selected.Person = person;
        this.Timer.Set(person.Time);
      },
    },
  };

  @ViewChild('TimerTemplate', { static: false }) timer_ref: TemplateRef<any>;
  Timer = {
    STR: <[number, number, number, number]>[null, null, null, null],
    //Hours: <number>0,
    Minutes: <number>0,
    Seconds: <number>0,
    Set: (total_seconds: number) => {
      //const hours = total_seconds / 3600;
      const minutes = total_seconds / 60;
      const seconds = (minutes - Math.floor(minutes)) * 60;
      //console.log('Hours:', Math.floor(hours));
      console.log('Minutes:', Math.floor(minutes));
      console.log('Seconds:', Math.round(seconds));
      //const minutes
      //this.Timer.Hours = Math.floor(hours);
      this.Timer.Minutes = Math.floor(minutes);
      this.Timer.Seconds = Math.round(seconds);
      // const timer_str = [];
      // const str_minutes = `${Math.floor(minutes)}`;
      // if (str_minutes.length === 2) {
      //   timer_str.push(Number(str_minutes[0]), Number(str_minutes[1]));
      // } else {
      //   timer_str.push(null, Math.floor(minutes));
      // }
      //this.Timer.STR = [null, Math.floor(minutes), null, Math.round(seconds)];
    },
    Launch: (person: Person) => {
      this.Timer.Set(person.Time);
      console.log(this.Timer.STR);
      this._dialog.open(this.timer_ref);
    },
    AddTime: (digit: number) => {
      const reverse_index = this.Timer.STR.findIndex(
        (str_digit) => !!!str_digit
      );
      if (reverse_index === -1) {
        console.log(this.Timer.STR);
        return;
      }
      this.Timer.STR.shift();
      this.Timer.STR.push(digit);
    },
    ClearTime: () => {
      this.Timer.STR = [null, null, null, null];
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
}

enum LS_Key {
  People = 'People',
}

interface Person {
  Name: string;
  Time: number;
}
