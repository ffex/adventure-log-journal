import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Transcript } from '../../data/transcript.model';
import { AppwriteService } from '../../services/appwrite.service';

@Component({
  selector: 'app-transcription-list-page',
  standalone: true,
  imports: [TableModule, ButtonModule],
  templateUrl: './transcription-list-page.component.html',
  styleUrl: './transcription-list-page.component.css'
})
export class TranscriptionListPageComponent {
  @Input() adventureId: string | null = null;
  transcripts: Transcript[] = [];
  selectedTranscript: Transcript | null = null;
  @Output() createClicked = new EventEmitter<void>(); 
  @Output() viewClicked = new EventEmitter<string>();

  constructor(private appwriteService: AppwriteService) {

  }

  ngOnInit() {
    if (this.adventureId) {
      this.loadTranscripts(this.adventureId);
    }
  }

  loadTranscripts(adventureId: string) {
    this.appwriteService.getTranscripts(adventureId).then((transcripts) => {
      console.log(transcripts);
      this.transcripts = transcripts.documents.map((transcript) => new Transcript(transcript));
    });
  }

  onAdd() {
    this.createClicked.emit();
  }

  onView(transcriptId: string) {
    this.viewClicked.emit(transcriptId);
  }

  onDelete(transcript: Transcript) {
    console.log(transcript);
  }
}
