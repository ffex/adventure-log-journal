import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../../data/character.model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppwriteService } from '../../../services/appwrite.service';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-character-detail-page',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, FloatLabelModule, CardModule, ButtonModule],
  templateUrl: './character-detail-page.component.html',
  styleUrl: './character-detail-page.component.css'
})
export class CharacterDetailPageComponent {
  @Input() adventureId: string | null = null;
  @Input() set characterId(value: string | null) {
    if (value) {
      this._characterId = value;
      this.loadCharacter(value);
    }
  }
  @Output() saveClicked = new EventEmitter<Character>();
  _characterId: string | null = null;

  characterForm: FormGroup;
  currentCharacter: Character | null = null;

  constructor(private fb: FormBuilder, private appwriteService: AppwriteService) {
    this.characterForm = this.fb.group({
      name: [''],
      race: [''],
      characterClass: [''],
    });
  }

  onSubmit() {
    console.log(this.characterForm.value);
    let character = new Character(this.characterForm.value);
    character.adventure = this.adventureId;
    this.appwriteService.saveCharacter(character);
    this.saveClicked.emit(character);

  }

  loadCharacter(characterId: string) {
    this.appwriteService.getCharacter(characterId).then((character) => {
      this.currentCharacter = new Character(character);
      this.characterForm.patchValue({
        name: character['name'],
        race: character['race'],
        characterClass: character['characterClass'],
      });
    });
  }
}
