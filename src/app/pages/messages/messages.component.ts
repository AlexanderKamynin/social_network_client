import { Component, OnInit } from '@angular/core';
import { IDialog, IMessage } from 'src/app/interfaces/message';
import { IUser } from 'src/app/interfaces/user';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{
  friend: IUser;
  user: IUser;
  new_message: string;
  messages: IMessage[];
  dialog: IDialog;

  constructor(
    public MessagesService: MessagesService,
    public UserService: UserService
  ) {};

  ngOnInit(): void {
    this.user = this.UserService.get_current_user();
    this.MessagesService.messages_listener(() => this.display_component());
    this.display_component();
  }

  display_component() {
    this.MessagesService.get_user_messages(this.user.id).subscribe((dialog: IDialog) => {
      if(dialog)
      {
        this.dialog = dialog;
        this.friend = dialog.friend;
        this.messages = dialog.messages;
      }
    })
  }

  add_message() {
    this.MessagesService.add_message(this.user.id, this.new_message);
  }
}
