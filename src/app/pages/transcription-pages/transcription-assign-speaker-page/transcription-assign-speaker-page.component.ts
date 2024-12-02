import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { AppwriteService } from '../../../services/appwrite.service';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Character } from '../../../data/character.model';
import { Transcript } from '../../../data/transcript.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-transcription-assign-speaker-page',
  standalone: true,
  imports: [SelectModule, FormsModule, CardModule, CommonModule, ButtonModule],
  templateUrl: './transcription-assign-speaker-page.component.html',
  styleUrl: './transcription-assign-speaker-page.component.css'
})
export class TranscriptionAssignSpeakerPageComponent {
  @Input() adventureId: string | null = null;
  @Input() transcriptId: string | null = null;
  @Output() saveClicked = new EventEmitter<void>();
  speakers: any[] = [];
  characters: any[] = [];

  constructor(private appwriteService: AppwriteService) {}

  ngOnInit() {
    if (this.adventureId) {
      console.log("loading characters");
      this.loadCharacters(this.adventureId);
    }
    if(this.transcriptId) {

      this.loadSpeakers(this.transcriptId);
    }
  }

  loadCharacters(adventureId: string) {
    this.appwriteService.getCharacters(adventureId).then((characters) => {
      console.log("characters", characters);
      this.characters = characters.documents.map((character) => new Character(character))
      .map((character) => ({name: character.name, code: character.name }));
      

      this.characters =[...this.characters,{name:"DM",code:"DM"}];
      console.log("characters", this.characters);
    });
  }

  loadSpeakers(transcriptId: string) {
    this.appwriteService.getTranscript(transcriptId).then((transcript) => {

      this.speakers = new Transcript(transcript).speakerCharacter;
    });
  }

  onSubmit() {
    console.log("submit", this.speakers);
    this.appwriteService.saveSpeaker(this.speakers).then((speaker) => {
      console.log("speaker", speaker);
      this.saveClicked.emit();
    });
  }


}
