import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Character } from '../../data/character.model';
import { Transcript } from '../../data/transcript.model';
import { AppwriteService } from '../../services/appwrite.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transcription-detail-page',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, FloatLabelModule, CardModule, ButtonModule, CommonModule],
  templateUrl: './transcription-detail-page.component.html',
  styleUrl: './transcription-detail-page.component.css'
})
export class TranscriptionDetailPageComponent {
  @Input() adventureId: string | null = null;
  @Input() set transcriptId(value: string | null) {
    if (value) {
      this._transcriptId = value;
      this.loadTranscript(value);
    }
  }
  @Output() saveClicked = new EventEmitter<Transcript>();
  _transcriptId: string | null = null;

  transcriptForm: FormGroup;
  currentTranscript: Transcript | null = null;

  constructor(private appwriteService: AppwriteService) {
    this.transcriptForm = new FormGroup({
      name: new FormControl('')
    });
  }

  loadTranscript(transcriptId: string) {
    this.appwriteService.getTranscript(transcriptId).then(transcript => {
      this.currentTranscript = new Transcript(transcript);
      this.transcriptForm.patchValue({
        name: transcript['name'],
        dateUpload: transcript['dateUpload'],
        rawText: transcript['rawText'],
        fileUrl: transcript['fileUrl'],
      });
    });
  }

}
