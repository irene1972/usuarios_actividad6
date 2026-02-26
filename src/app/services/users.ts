import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUserResponse } from '../interfaces/i-user-response';
import { firstValueFrom, Observable } from 'rxjs';
import { IUser } from '../interfaces/i-user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Users {
  //private baseUrl='https://peticiones.online/api/users';
  private baseUrl=environment.apiUrl;
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
    return this.httpClient.post(this.baseUrl,body, {});
  }
  deleteUser(id:string | undefined):Observable<any>{
    return this.httpClient.delete(this.baseUrl + '/' + id,{});
  }
  updateUser(id:number,body:IUser):Observable<any>{
    return this.httpClient.put(this.baseUrl + '/' + id,body,{})
  }
}
