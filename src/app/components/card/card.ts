import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Users } from '../../services/users';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  miUsuario:any;
  usersService=inject(Users);

  @Input() imagen:string='';
  @Input() nombre:string='';
  @Input() id:number=0;
  @Input() _id:string|undefined='';

  eliminar($event:any,id:any){
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
            console.log(data);
  
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
