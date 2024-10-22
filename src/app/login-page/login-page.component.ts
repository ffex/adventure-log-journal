import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AppwriteService } from '../services/appwrite.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CardModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';


  constructor(private appwriteService: AppwriteService) { }

  login() {
    console.log('login');
      this.appwriteService.loginAccount(this.username, this.password)
      .then(function (response) {
        console.log(response); // Success
      }, function (error) {
        console.log(error); // Failure
      });
  }
}
