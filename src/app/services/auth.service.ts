import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: IUser;
  private isAuth = false;
  public backend = 'https://localhost:3000';
  public users: IUser[];

  constructor(
		private http: HttpClient,
		private router: Router
	) {};

  login(email: string, password: string){
    this.http.get(this.backend + '/get_users').subscribe((data: any) => {
      this.users = data.users_table;
      //console.log(this.users);
      this.http.post(this.backend + '/auth', {email: email, password: password}).subscribe(
        (res: any) => {
          if(res.accepted)
          {
            this.isAuth = true;
            this.user = res.user;
            //TODO: перейти на страницу профиля
          }
          else
          {
            console.log(res.reason);
          }
        }
      )
    })
  }
}
