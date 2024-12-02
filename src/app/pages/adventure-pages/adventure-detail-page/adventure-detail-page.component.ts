import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AppwriteService } from '../../../services/appwrite.service';
import { Adventure } from '../../../data/adventure.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adventure-detail-page',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, FloatLabelModule, CardModule, ButtonModule],
  templateUrl: './adventure-detail-page.component.html',
  styleUrl: './adventure-detail-page.component.css'
})
export class AdventureDetailPageComponent {
  @Input() adventureId: string | null = null;
    adventureForm: FormGroup;
    currentAdventure: Adventure | null = null;

    constructor(private fb: FormBuilder, private appwriteService: AppwriteService) {
        this.adventureForm = this.fb.group({
            title: [''],
            startDate: [''],
            numberOfPcs: [0]
          });
    }

    ngOnInit() {
      if (this.adventureId) {
        this.loadAdventure(this.adventureId);
      }
    }

    loadAdventure(adventureId: string) {
        this.appwriteService.getAdventure(adventureId).then((adventure) => {
            this.currentAdventure = new Adventure(adventure);
            this.adventureForm.patchValue({
              title: adventure['title'],
              startDate: adventure['startDate'],
              numberOfPcs: adventure['numberOfPcs']
            });
        });
    }

    onSubmit() {
        console.log(this.adventureForm.value);
        this.appwriteService.saveAdventure(new Adventure(this.adventureForm.value));
    }
}
