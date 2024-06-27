import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { MaterialsModule } from '../materials/materials.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, MaterialsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private _dialog: MatDialog) {
    this.People.Initialize();
  }

  ngOnInit(): void {}

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
        this.Keyboard.Set(person.Time);
      },
    },
  };

  Keyboard = {
    Hours: <number>0,
    Minutes: <number>0,
    Seconds: <number>0,
    Set: (total_seconds: number) => {
      const hours = total_seconds / 3600;
      const minutes = (hours - Math.floor(hours)) * 60;
      const seconds = (minutes - Math.floor(minutes)) * 60;
      console.log('Hours:', Math.floor(hours));
      console.log('Minutes:', Math.floor(minutes));
      console.log('Seconds:', Math.round(seconds));
      //const minutes
      this.Keyboard.Hours = Math.floor(hours);
      this.Keyboard.Minutes = Math.floor(minutes);
      this.Keyboard.Seconds = Math.round(seconds);
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
