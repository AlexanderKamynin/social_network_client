import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: IUser;
  selected_img: File;
  image_path = "";

  constructor(
    public UserService: UserService
  ) {};

  ngOnInit(): void {
    this.user = this.UserService.get_current_user();  
    this.image_path = this.UserService.backend + '/src/img/' + this.user.avatar;
  }


  on_selected_file(event: any) {
    this.selected_img = <File>event.target.files[0];
    //console.log(this.selected_img);
  }

  upload_avatar() {
    if(this.selected_img){
      const img_info = {name: this.selected_img.name, type: this.selected_img.type};
      
      this.UserService.upload_avatar(this.user.id, img_info, () => {
        this.user = this.UserService.get_current_user();
        this.image_path = this.UserService.backend + '/src/img/' + this.user.avatar;
      });
    }
    else {
      console.log("Файл не выбран!");
    }
  }

  delete_avatar() {
    this.UserService.delete_avatar(this.user.id, () => {
      this.user = this.UserService.get_current_user();
      this.image_path = this.UserService.backend + '/src/img/' + this.user.avatar;
    });
  }
}