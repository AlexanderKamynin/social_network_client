import { Injectable } from '@angular/core';
import { INews } from '../interfaces/news';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Socket, io } from 'socket.io-client';

let socket: Socket;

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  public backend = 'https://localhost:3000';

  constructor(private http: HttpClient) {
    socket = io(this.backend);
  };

  news_listener(handler: () => void)
  {
    //socket.removeAllListeners('add_news_server');
    socket.on("add_news_server", () => {
      //console.log("я реагирую");
      handler();
    });
  }

  add_news(user_id: number, new_post: string) {
    socket.emit("add_news_client", {
      user_id: user_id,
      new_post: new_post
    });
  }

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
