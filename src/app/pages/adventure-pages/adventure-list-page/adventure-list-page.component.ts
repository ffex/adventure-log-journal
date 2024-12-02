import { Component } from '@angular/core';
import { Adventure } from '../../../data/adventure.model';
import { AppwriteService } from '../../../services/appwrite.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adventure-list-page',
  standalone: true,
  imports: [TableModule, ButtonModule],
  templateUrl: './adventure-list-page.component.html',
  styleUrl: './adventure-list-page.component.css'
})
export class AdventureListPageComponent {
    adventures: Adventure[] = [];
    selectedAdventure: Adventure | null = null;

    constructor(private appwriteService: AppwriteService, private router: Router) {
        this.appwriteService.getAdventures().then((adventures) => {
            console.log(adventures);
            this.adventures = adventures.documents.map((adventure) => new Adventure(adventure));
        });
    }

    onEdit(adventure: Adventure) {
        this.router.navigate(['/adventure', adventure.$id]);
    }

    onDelete(adventure: Adventure) {
        console.log(adventure);
    }

    onAdd() {
        console.log('add');
        this.router.navigate(['/adventure']);
    }
}
