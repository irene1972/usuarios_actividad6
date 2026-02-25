import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUserResponse } from '../interfaces/i-user-response';
import { firstValueFrom, Observable } from 'rxjs';
import { IUser } from '../interfaces/i-user';

@Injectable({
  providedIn: 'root',
})
export class Users {
  private baseUrl='https://peticiones.online/api/users';
  httpClient=inject(HttpClient)

  getAllUsers():Observable<IUserResponse>{
    return this.httpClient.get<IUserResponse>(this.baseUrl);
  }

  getAllUsersPromise():Promise<IUserResponse>{
    return firstValueFrom(this.httpClient.get<IUserResponse>(this.baseUrl));
  }

  getUserById(id:string):Observable<IUser>{
    return this.httpClient.get<IUser>(this.baseUrl+'/'+id);
  }

  insertUser(body:IUser):Observable<any>{
    let url='https://peticiones.online/api/users';
    return this.httpClient.post(url,body, {});
  }
  deleteUser(id:string):Observable<any>{
    let url='https://peticiones.online/api/users/';
    return this.httpClient.delete(url + id,{});
  }
  updateUser(id:number,body:IUser):Observable<any>{
    let url='https://peticiones.online/api/users/';
    return this.httpClient.put(url + id,body,{})
  }
}
