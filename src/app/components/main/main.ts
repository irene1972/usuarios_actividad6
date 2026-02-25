import { Component, inject } from '@angular/core';
import { Users } from '../../services/users';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { Card } from '../card/card';

@Component({
  selector: 'app-main',
  imports: [CommonModule,Card],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  usersService = inject(Users);

  items$ = this.usersService.getAllUsers().pipe(
    map((resp) => resp.results)
  );
}
