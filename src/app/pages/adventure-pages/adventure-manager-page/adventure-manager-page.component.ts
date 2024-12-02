import { Component, ViewChild } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DividerModule } from 'primeng/divider';
import { TabsModule } from 'primeng/tabs';
import { ActivatedRoute } from '@angular/router';
import { AdventureDetailPageComponent } from '../adventure-detail-page/adventure-detail-page.component';
import { CharacterDetailPageComponent } from '../../characters-pages/character-detail-page/character-detail-page.component';
import { CharacterListPageComponent } from '../../characters-pages/character-list-page/character-list-page.component';
import { TranscriptionListPageComponent } from '../../../pages/transcription-pages/transcription-list-page/transcription-list-page.component';
import { TranscriptionUploadPageComponent } from '../../../pages/transcription-pages/transcription-upload-page/transcription-upload-page.component';
import { NgIf } from '@angular/common';
import { Transcript } from '../../../data/transcript.model';
import { TranscriptionDetailPageComponent } from '../../../pages/transcription-pages/transcription-detail-page/transcription-detail-page.component';
import { TranscriptionAssignSpeakerPageComponent } from '../../../pages/transcription-pages/transcription-assign-speaker-page/transcription-assign-speaker-page.component';
import { AdventureJournalPageComponent } from '../../../pages/adventure-journal-page/adventure-journal-page.component';

@Component({
  selector: 'app-adventure-manager-page',
  standalone: true,
  imports: [PanelMenuModule, DividerModule, TabsModule, AdventureDetailPageComponent, CharacterDetailPageComponent, CharacterListPageComponent, NgIf, TranscriptionListPageComponent, TranscriptionUploadPageComponent,
     TranscriptionDetailPageComponent, TranscriptionAssignSpeakerPageComponent, AdventureJournalPageComponent],
  templateUrl: './adventure-manager-page.component.html',
  styleUrl: './adventure-manager-page.component.css'
})
export class AdventureManagerPageComponent {
  activeIndex: number = 0;
  adventureId: string | null = null;
  showCharacterDetail: boolean = false;
  showTranscriptionPanel: string="list";
  currentCharacterId: string | null = null;
  currentTranscriptId: string | null = null;

  @ViewChild(CharacterListPageComponent) characterListPage!: CharacterListPageComponent;
  @ViewChild(TranscriptionListPageComponent) transcriptionListPage!: TranscriptionListPageComponent;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.adventureId = params.get('id');
    });
  }

  onCharacterCreate() {
    console.log('onCharacterCreate');
    this.showCharacterDetail = true;
    this.characterListPage.loadCharacters(this.adventureId!);
  }

  onCharacterEdit(characterId: string) {
    console.log(characterId);
    this.showCharacterDetail = true;
    this.currentCharacterId = characterId;
  }

  onCharacterSave() {
    console.log("Saved");
    this.showCharacterDetail = false;
  }

  onTranscriptionCreate() {
    console.log("onTranscriptionCreate");
    this.showTranscriptionPanel = "upload";
  }

  onTranscriptionSave() {
    console.log("onTranscriptionSave");
    this.showTranscriptionPanel = "list";
    //this.transcriptionListPage.loadTranscripts(this.adventureId!);
  }

  onTranscriptionView(transcriptId: string) {
    console.log("onTranscriptionView");
    this.showTranscriptionPanel = "detail";
    this.currentTranscriptId = transcriptId;
  }

  onAssignSpeaker(transcriptId: string) {
    console.log("onAssignSpeaker");
    this.showTranscriptionPanel = "assign";
    this.currentTranscriptId = transcriptId;
  }
}
