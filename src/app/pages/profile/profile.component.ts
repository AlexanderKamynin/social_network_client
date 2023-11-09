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
    this.user = JSON.parse(sessionStorage.getItem('user')!);
    this.image_path = this.UserService.backend + '/src/img/' + this.user.avatar;
  }

  on_selected_file(event: any) {
    this.selected_img = <File>event.target.files[0];
  }

  upload_avatar() {
    if(this.selected_img){
      const img_info = {name: this.selected_img.name, type: this.selected_img.type};
      
      this.UserService.upload_avatar(this.user.id, img_info, () => {
        this.user = JSON.parse(sessionStorage.getItem('user')!);
        this.image_path = this.UserService.backend + '/src/img/' + this.user.avatar;
      });
    }
    else {
      //console.log("Файл не выбран!");
      alert("Файл не выбран");
    }
  }

  delete_avatar() {
    this.UserService.delete_avatar(this.user.id, () => {
      this.user = JSON.parse(sessionStorage.getItem('user')!);
      this.image_path = this.UserService.backend + '/src/img/' + this.user.avatar;
    });
  }
}
