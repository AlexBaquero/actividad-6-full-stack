import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';
import { inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  userForm!: FormGroup;
  isUpdate: boolean = false; 
  userId!: string;

  userService = inject(UserService);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  router = inject(Router);

  ngOnInit(): void {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]]
    });

    this.userId = this.route.snapshot.paramMap.get('id') || '';
    if (this.userId) {
      this.isUpdate = true;
      this.loadUser();
    }
  }


  async loadUser() {
    try {
      const user: IUser = await this.userService.getById(this.userId);
      this.userForm.patchValue({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        image: user.image
      });
    } catch (err) {
      console.error(err);
    }
  }

 
  async onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const userData = this.userForm.value;

    try {
      if (this.isUpdate) {
        await this.userService.update(userData.first_name, userData.username);
        alert('Usuario actualizado correctamente');
      } else {
        await this.userService.insert(userData);
        alert('Usuario creado correctamente');
      }
      this.router.navigate(['/home']);
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al guardar el usuario');
    }
  }

}
