import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AppwriteService } from '../../services/appwrite.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CardModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm: FormGroup;
  loginFailed: boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private appwriteService: AppwriteService, private route: ActivatedRoute) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    const status = this.route.snapshot.queryParams['status'];
    if (status === 'failed') {
      this.loginFailed = true;
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login();
    }
  }

  login() {
    this.appwriteService.loginAccount(this.loginForm.value.email, this.loginForm.value.password)
      .then((response) => {
        this.router.navigate(['/']);
        console.log(response); // Success
      }, (error) => {
        this.router.navigate(['/login'], { queryParams: { status: 'failed' } });
        console.log(error); // Failure
      });
  }

  isFieldInvalid(fieldName: string): boolean {
    return this.loginForm.get(fieldName)!.invalid &&
      (this.loginForm.get(fieldName)!.dirty || this.loginForm.get(fieldName)!.touched);
  }
}
