import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdventureDetailPageComponent } from './adventure-pages/adventure-detail-page/adventure-detail-page.component';
import { AdventureListPageComponent } from './adventure-pages/adventure-list-page/adventure-list-page.component';
import { AdventureManagerPageComponent } from './adventure-pages/adventure-manager-page/adventure-manager-page.component';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'upload', component: UploadPageComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'adventure', component: AdventureDetailPageComponent },
    { path: 'adventure/:id', component: AdventureManagerPageComponent },
    { path: 'adventure-list', component: AdventureListPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
];
