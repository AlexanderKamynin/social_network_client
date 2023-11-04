import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit{
  friend_id: number;
  user: IUser;
  friends: IUser[];

  constructor(
    public UserService: UserService
  ) {};

  ngOnInit(): void {
      this.user = this.UserService.get_current_user();
      this.display_component();
  }

  display_component() {
    this.UserService.get_user_friends(this.user.id).subscribe((friends: IUser[]) => {
      if(friends)
      {
        this.friends = friends;
      }
    })
  }

  add_friend(){
    this.UserService.add_friend(this.user.id, this.friend_id, () => {
      this.user = this.UserService.get_current_user();
      this.display_component();
    });
  }

  delete_friend(){
    this.UserService.delete_friend(this.user.id, this.friend_id, () => {
      this.user = this.UserService.get_current_user();
      this.display_component();
    });
  }
}
