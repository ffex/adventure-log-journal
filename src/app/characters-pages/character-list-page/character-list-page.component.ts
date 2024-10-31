import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../data/character.model';
import { AppwriteService } from '../../services/appwrite.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-character-list-page',
  standalone: true,
  imports: [TableModule, ButtonModule],
  templateUrl: './character-list-page.component.html',
  styleUrl: './character-list-page.component.css'
})
export class CharacterListPageComponent {
  @Input() adventureId: string | null = null;
  characters: Character[] = [];
  selectedCharacter: Character | null = null;
  @Output() createClicked = new EventEmitter<void>(); 
  @Output() editClicked = new EventEmitter<string>();

  constructor(private appwriteService: AppwriteService) {

  }

  ngOnInit() {
    if (this.adventureId) {
      this.loadCharacters(this.adventureId);
    }
  }


  loadCharacters(adventureId: string) {
    this.appwriteService.getCharacters(adventureId).then((characters) => {
      this.characters = characters.documents.map((character) => new Character(character));
    });
  }

  onEdit(character: Character) {
    console.log(character);
    this.editClicked.emit(character.$id!);
  }

  onDelete(character: Character) {
    console.log(character);
  }

  onAdd() {
    console.log('add');
    this.createClicked.emit();
  }
}
