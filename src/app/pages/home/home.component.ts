import { Component } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';
import { inject, Injectable } from '@angular/core';
import { CardUserComponent } from '../../components/card-user/card-user.component';

@Component({
  selector: 'app-home',
  imports: [ CardUserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  userServices = inject(UserService)
  array_users: IUser[] = [];
  currentPage = 1;
  usersPerPage = 6;
  totalUsers = 0;

  async ngOnInit() {
    try {
      const response = await this.userServices.getAll()
      console.log(response)
      this.array_users = response.results;  
      this.totalUsers = response.total;
    }
    catch (msg: any) {
      alert(msg.error.error)
    }
  }


  get paginatedUsers(): IUser[] {
    const start = (this.currentPage - 1) * this.usersPerPage;
    return this.array_users.slice(start, start + this.usersPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.array_users.length / this.usersPerPage);
  }
}
