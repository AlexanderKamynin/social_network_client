import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name = "";
  email = "";
  password = "";

  constructor(private AuthService: AuthService) {};

  login() {
    //console.log("Try to login");
    this.AuthService.login(this.email, this.password);
  }

  ngOnInit(): void {
      
  };
}
