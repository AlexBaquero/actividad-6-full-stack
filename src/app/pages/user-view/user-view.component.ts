import { Component } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';
import { inject, Injectable } from '@angular/core';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-view',
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})

export class UserViewComponent {
  userService = inject(UserService)
  route = inject(ActivatedRoute)
  user!: IUser

 async ngOnInit() {
    const idUser = this.route.snapshot.paramMap.get('id');
    if (idUser) {
      try {
        this.user = await this.userService.getById(idUser);
        console.log('Usuario cargado:', this.user);
      } catch (error: any) {
        console.error(error.error);
      }
    }
  }

  async deleteUser() {
  if (!this.user) return;

  const result = await Swal.fire({
    title: `¿Deseas borrar el usuario ${this.user.username}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    try {
      await this.userService.remove(this.user._id); 
      await Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
    } catch (error) {
      await Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
    }
  }
}
}
