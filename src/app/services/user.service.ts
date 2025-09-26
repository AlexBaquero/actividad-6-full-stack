import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser, IUserResponse  } from '../interfaces/iuser';
import { first, lastValueFrom } from 'rxjs';
import { inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endPoint: string = "https://peticiones.online/api/users"
  private httpClient = inject(HttpClient)

 
  getAll(): Promise<IUserResponse> {
    return lastValueFrom(this.httpClient.get<IUserResponse>(this.endPoint))
  }

  getById(idEmployee: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>(`${this.endPoint}/${idEmployee}`))
  }


  insert(employee: IUser): Promise<IUser> {
    return lastValueFrom(this.httpClient.post<IUser>(this.endPoint, employee))
  }


  remove(idEmployee: string): Promise<IUser | any> {
    return lastValueFrom(this.httpClient.delete<IUser | any>(`${this.endPoint}/${idEmployee}`))
  }


  update(first_name: string, username: string): Promise<IUser> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return lastValueFrom(this.httpClient.put<IUser>(`${this.endPoint}/${this}`, { first_name, username }, { headers }));
  }
}
