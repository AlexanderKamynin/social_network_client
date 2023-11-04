import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/router';
import { AuthService } from './auth.service';
import { tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: IUser[];
  private current_user: IUser;
  public backend = 'https://localhost:3000';

  constructor(private http: HttpClient, private AuthService: AuthService){
    this.get_all_users();
    this.current_user = this.AuthService.user;
  };

  get_all_users(): IUser[] {
    this.http.get(this.backend + '/get_users').subscribe((res: any) => {
      this.users = res.users_table;
    });
    return this.users;
  }

  get_current_user(): IUser {
    return this.current_user;
  }

  get_user_friends(user_id: number): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.backend + `/get_user_friends/${user_id}`).pipe(
      tap(
        (res: any) => {
          console.log(res);
          return res;
        }
      )
    )
  }

  add_friend(user_id: number, friend_id: number) 
  {
    return this.http.post(this.backend + '/add_friend', {user_id: user_id, friend_id: friend_id}).pipe(
      tap(
        (res: any) => {
          console.log(res.success);
        }
      )
    )
  }

  delete_friend(user_id: number, friend_id: number)
  {
    return this.http.post(this.backend + '/delete_friend', {user_id: user_id, friend_id: friend_id}).pipe(
      tap(
        (res: any) => {
          console.log(res.success);
        }
      )
    )
  }

  upload_avatar(user_id: number, new_img: any, handler: () => void) {
    this.http.post(this.backend + '/upload_avatar', {user_id: user_id, name: new_img.name, type: new_img.type}).subscribe(
      (res: any) => {
        if (res.success){
          this.current_user = res.new_user_data;
          this.get_all_users();
          handler();
        }
        else {
          console.log(res.reason);
        }
      }
    )
  }

  delete_avatar(user_id: number, handler: () => void)
  {
    this.http.post(this.backend + '/delete_avatar', {user_id: user_id}).subscribe(
      (res: any) => {
        this.current_user = res.new_user_data;
        this.get_all_users();

        handler();
      }
    )
  }
}
