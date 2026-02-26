import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Users } from '../../services/users';
import { CommonModule } from '@angular/common';
import { Card } from '../card/card';
import { IUser } from '../../interfaces/i-user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [CommonModule, Card],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  usersService = inject(Users);
  misUsuarios: IUser[] | undefined = undefined;
  idUsuario: string = '';

  constructor(private cd: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() {



    this.usersService.getAllUsers().subscribe((data) => {
      this.misUsuarios = data.results;

      this.route.paramMap.subscribe(params => {
        
        const newUser:any = {
          id: 20,
          first_name: params.get('nombre'),
          last_name: params.get('apellidos'),
          username: null,
          email: params.get('email'),
          image: params.get('imagen')
        };

        if(params.get('nombre')) this.misUsuarios?.push(newUser);
        
        //console.log(this.misUsuarios);
        this.cd.detectChanges();

      });

      this.cd.detectChanges();
    });
  }

  recogerId($event: string) {
    this.idUsuario = $event;
    this.misUsuarios = this.misUsuarios?.filter(elem => elem._id !== $event);
  }
}
