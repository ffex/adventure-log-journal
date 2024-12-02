import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AppwriteService } from '../../services/appwrite.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



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
  loginFailed: boolean = false;
  constructor(private router: Router, private appwriteService: AppwriteService, private route: ActivatedRoute) { }

  ngOnInit() {
    const status = this.route.snapshot.queryParams['status'];
    if (status === 'failed') {
      this.loginFailed = true;
    }
  }

  login() {
    console.log('login');
    this.appwriteService.loginAccount(this.username, this.password)
      .then((response) => {
        this.router.navigate(['/']);
        console.log(response); // Success
      }, (error) => {
        this.router.navigate(['/login', {queryParams: {status: 'failed'}}]);
        console.log(error); // Failure
      });
  }
}
