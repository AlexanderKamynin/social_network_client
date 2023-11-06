import { Component, OnInit } from '@angular/core';
import { INews } from 'src/app/interfaces/news';
import { IUser } from 'src/app/interfaces/user';
import { NewsService } from 'src/app/services/news.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  new_post: string;
  user: IUser;
  friend_news: INews[];
  user_news: INews[];

  constructor(
    public UserService: UserService,
    public NewsService: NewsService
  ) {};

  ngOnInit(): void {
    this.user = this.UserService.get_current_user();
    this.display_component();
  }

  display_component() {
    this.NewsService.get_user_news(this.user.id).subscribe((news: INews[]) => {
      if(news)
      {
        this.user_news = news;
      }
    })

    this.NewsService.get_friends_news(this.user.id).subscribe((news: INews[]) => {
      if(news)
      {
        this.friend_news = news;
      }
    })
  }

  add_news() {
    this.NewsService.add_news(this.new_post);
  }
}
