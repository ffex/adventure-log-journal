import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'upload', component: UploadPageComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
];
