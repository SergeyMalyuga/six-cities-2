import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { APIRoute, BASE_URL } from '../constants/const';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http: HttpClient = inject(HttpClient);

  public getUser(): Observable<User> {
    return this.http.get<User>(`${BASE_URL}/${APIRoute.LOGIN}`);
  }

  public postUser(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${BASE_URL}/${APIRoute.LOGIN}`, {
      email,
      password,
    });
  }

  public logout(): Observable<void> {
    return this.http.delete<void>(`https://${BASE_URL}/${APIRoute.LOGOUT}`);
  }
}
