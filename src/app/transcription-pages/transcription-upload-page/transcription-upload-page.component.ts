import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transcript } from '../../data/transcript.model';
import { AppwriteService } from '../../services/appwrite.service';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-transcription-upload-page',
  standalone: true,
  imports: [FileUploadModule, ButtonModule, CardModule, ReactiveFormsModule,InputTextModule, FloatLabelModule,CommonModule],
  templateUrl: './transcription-upload-page.component.html',
  styleUrl: './transcription-upload-page.component.css'
})
export class TranscriptionUploadPageComponent {
  @Input() adventureId: string | null = null; 
  @Output() saveClicked = new EventEmitter<void>();
  transcriptForm: FormGroup;
  uploadState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
 //TODO rename, it upload only the file
  
  constructor(private appwriteService: AppwriteService) {
    this.transcriptForm = new FormGroup({
      name: new FormControl('')
    });
  }

  onUpload(event: any) {
    console.log("onUpload");
    this.uploadState = 'loading';
    this.appwriteService.uploadTranscript(event.files[0]).then((response) => {
      this.appwriteService.saveTranscript(response.$id, this.transcriptForm.value.name, this.adventureId!).then(() => {
        this.uploadState = 'success';
        this.saveClicked.emit();
      });
    });
  }
}
