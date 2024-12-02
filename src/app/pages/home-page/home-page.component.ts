import { Component } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ButtonModule,CardModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  title = 'adventurer';
}
