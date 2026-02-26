import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Users } from '../../services/users';
import { CommonModule } from '@angular/common';
import { Card } from '../card/card';
import { IUser } from '../../interfaces/i-user';

@Component({
  selector: 'app-main',
  imports: [CommonModule,Card],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  usersService = inject(Users);
  misUsuarios:IUser[] | undefined=undefined;
  idUsuario:string='';

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(){
    this.usersService.getAllUsers().subscribe((data) => {
      this.misUsuarios = data.results;
      this.cd.detectChanges();
    });
  }

  recogerId($event:string){
    this.idUsuario=$event;
    this.misUsuarios=this.misUsuarios?.filter(elem=>elem._id !== $event);
  }
}
