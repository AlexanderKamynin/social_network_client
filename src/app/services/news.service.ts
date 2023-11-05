import { Injectable } from '@angular/core';
import { INews } from '../interfaces/news';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  public backend = 'https://localhost:3000';

  constructor(private http: HttpClient) { };

  get_user_news(user_id: number): Observable<INews[]>{
    return this.http.get<INews[]>(this.backend + `/get_user_news/${user_id}`).pipe(
      map(
        (res: any) => {
          return res.news;
        }
      )
    )
  }

  get_friends_news(user_id: number): Observable<INews[]>{
    return this.http.get<INews[]>(this.backend + `/get_friends_news/${user_id}`).pipe(
      map(
        (res: any) => {
          return res.news;
        }
      )
    )
  }
}
