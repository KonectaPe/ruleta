import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly BASE_URL = environment.API_URL;

  constructor(private httpClient: HttpClient) {}

  login(user: object): Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/user/login`, user);
  }

  register(user: object): Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/participant/register`, user);
  }

  infoUser(id: string | null): Observable<any> {
    console.log(id);
    return this.httpClient.get(`${this.BASE_URL}/user/${id}`);
  }

  getParticipants(status: string | null): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/participant/list/${status}`);
  }

  updateStatusParticipant(userUpdate: any): Observable<any> {
    const status = {
      status: userUpdate.status,
    };
    return this.httpClient.put(
      `${this.BASE_URL}/participant/status/${userUpdate.username}`,
      status,
    );
  }
}