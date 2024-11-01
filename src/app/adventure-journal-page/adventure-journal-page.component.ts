import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { JournalDay } from '../data/journal-day.model';
import { AppwriteService } from '../services/appwrite.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adventure-journal-page',
  standalone: true,
  imports: [CardModule, CommonModule],
  templateUrl: './adventure-journal-page.component.html',
  styleUrl: './adventure-journal-page.component.css'
})
export class AdventureJournalPageComponent {
  @Input() adventureId: string | null = null;
  journalDays: JournalDay[] = [];

  constructor(private appwriteService: AppwriteService) {

  }

  ngOnInit() {
    if (this.adventureId) {
      this.loadJournalDays(this.adventureId);
    }
  }

  loadJournalDays(adventureId: string) {
    this.appwriteService.getJournalDays(adventureId).then((journalDays) => {
      this.journalDays = journalDays.documents.map((journalDay) => new JournalDay(journalDay));
    });
  }
}
