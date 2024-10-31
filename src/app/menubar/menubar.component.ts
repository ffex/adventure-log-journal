import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [MenubarModule, AvatarModule],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css'
})
export class MenubarComponent {
  items: MenuItem[] | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
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

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
