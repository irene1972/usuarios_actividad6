import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Users } from '../../services/users';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  imports: [CommonModule,RouterLink],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle {
  usuario$!: Observable<any>;
  activedRoute=inject(ActivatedRoute);
  usersService=inject(Users);
  id:string='';
  
  miUsuario:any=null;

  ngOnInit(){
    this.activedRoute.params.subscribe((params:any)=>{
      this.id=params.id;
      
    });
    this.usuario$ = this.activedRoute.params.pipe(
      switchMap(params => this.usersService.getUserById(params['id']))
    );
    /*
    this.usersService.getUserById(this.id).subscribe((data)=>{
      console.log(data);
      this.miUsuario=data;
    });
    */
  }

  eliminar($event:any,id:string){
    $event.preventDefault();
    Swal.fire({
      title: '¿Estás seguro de eliminar el usuario?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#ff0000',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

          this.usersService.deleteUser(id).subscribe((data)=>{

          if(data.error){
            Swal.fire('Ha habido un error', '', 'info');
          }else{
            Swal.fire('Eliminado!', data.first_name, 'success');
          }
        });
      }
    });
  }
  
}