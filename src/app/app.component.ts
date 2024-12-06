import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenubarComponent } from './menubar/menubar.component';
import { PrimeNGConfig } from 'primeng/api';
import { Aura } from 'primeng/themes/aura';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CommonModule } from '@angular/common';
import { definePreset } from 'primeng/themes';
import { Card } from 'primeng/card';

const myNord = definePreset(Aura, {
    primitive: {
        nordpolar: { 0: 'var(--nord0)', 1: 'var(--nord1)', 2: 'var(--nord2)', 3: 'var(--nord3)' },
        nordaurea: { 11: 'var(--nord11)', 12: 'var(--nord12)', 13: 'var(--nord13)', 14: 'var(--nord14)', 15: 'var(--nord15)' }
    },
    semantic: {
        primary: {
            50: '{nordaurea.11}',
            100: '{nordaurea.11}',
            200: '{nordaurea.11}',
            300: '{nordaurea.11}',
            400: '{nordaurea.11}',
            500: '{nordaurea.11}',
            600: '{nordaurea.11}',
            700: '{nordaurea.11}',
            800: '{nordaurea.11}',
            900: '{nordaurea.11}',
            950: '{nordaurea.11}'
        },
        surface: {
            0: '{nordpolar.3}',
            50: '{nordpolar.3}',
            100: '{nordpolar.3}',
            200: '{nordpolar.3}',
            300: '{nordpolar.2}',
            400: '{nordpolar.2}',
            500: '{nordpolar.1}',
            600: '{nordpolar.1}',
            700: '{nordpolar.1}',
            800: '{nordpolar.0}',
            900: '{nordpolar.0}',
            950: '{nordpolar.0}'
        },
        content: {
            background: '{surface.500}',
            hoverBackground: '{surface.100}',
            borderColor: '{surface.200}',
            color: '{text.color}',
            hoverColor: '{text.hover.color}'
        },
        card:{
            colorScheme: {
                    light: {
                        background: '{surface.500}',
                        color: '{text.color}'
                    },
                    dark: {
                        background: '{surface.500}',
                        color: '{text.color}'
                    }
            }
        }
    }
});


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MenubarComponent, HomePageComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    constructor(private config: PrimeNGConfig) {
        this.config.theme.set({
            preset: myNord
        });

    }
}
