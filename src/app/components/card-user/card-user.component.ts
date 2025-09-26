import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { inject, Injectable } from '@angular/core';

@Component({
  selector: 'app-card-user',
  imports: [RouterLink],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent {
    @Input() myUser!: IUser;
    userService = inject(UserService)

     async deleteUser() {
      if (!this.myUser) return;
    
      const result = await Swal.fire({
        title: `¿Deseas borrar el usuario ${this.myUser.username}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });
    
      if (result.isConfirmed) {
        try {
          await this.userService.remove(this.myUser._id); 
          await Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
        } catch (error) {
          await Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
        }
      }
    }
}
