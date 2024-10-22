import { Component } from '@angular/core';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [FileUploadModule, ToastModule, ButtonModule],
  templateUrl: './upload-page.component.html',
  styleUrl: './upload-page.component.css',
  providers: [MessageService]
})
export class UploadPageComponent {

  constructor(private messageService: MessageService) { }

  onUpload(event: UploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }

  testMessage() {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }
}
