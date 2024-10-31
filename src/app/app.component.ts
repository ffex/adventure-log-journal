import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenubarComponent } from './menubar/menubar.component';
import { PrimeNGConfig } from 'primeng/api';
import { Aura } from 'primeng/themes/aura';
import { HomePageComponent } from './home-page/home-page.component';
import { CommonModule } from '@angular/common';
import { Nora } from 'primeng/themes/nora';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MenubarComponent,HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private config: PrimeNGConfig) {
    this.config.theme.set({ preset: Aura });

  }
}
