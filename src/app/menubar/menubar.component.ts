import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { NavigationEnd, Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { AppwriteService } from '../services/appwrite.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [MenubarModule, AvatarModule, MenuModule],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css'
})
export class MenubarComponent {
  items: MenuItem[] | undefined;
  accountItems: MenuItem[] | undefined;
  isLoggedIn: boolean = false;
  accountFirstChar: string = '';
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router, private appwriteService: AppwriteService) {
    // Subscribe to router events
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkAccountLoggedIn();
    });
  }

  ngOnInit() {
    this.initializeMenuBar();
    this.checkAccountLoggedIn();
  }

  ngOnDestroy() {
    // Clean up subscription
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  logoutAccount() {
    this.appwriteService.logoutAccount().then(() => {
      this.checkAccountLoggedIn();
    });
  }

  checkAccountLoggedIn() {
    this.appwriteService.isLoggedIn().then((isLoggedIn) => {

      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.accountFirstChar = this.appwriteService.getAccountInfo().email.charAt(0);
        this.createLoggedInMenu();
      } else {
        this.createLoggedOutMenu();
      }
    });
  }

  initializeMenuBar() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/'
      },
      {
        label: 'Adventure',
        icon: 'pi pi-fw pi-crown',
        routerLink: '/adventure-list'
      },
      {
        label: 'About',
        icon: 'pi pi-fw pi-info-circle',
        routerLink: '/about'
      }
    ];
  }

  createLoggedInMenu() {
    this.accountItems = [
      {
        label: 'My account',
        icon: 'pi pi-fw pi-user',
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.logoutAccount()
      }
    ];
  }
  createLoggedOutMenu() {
    this.accountItems = [
      {
        label: 'Login',
        icon: 'pi pi-fw pi-user',
        command: () => this.navigateToLogin()
      }
    ];
  }
}
