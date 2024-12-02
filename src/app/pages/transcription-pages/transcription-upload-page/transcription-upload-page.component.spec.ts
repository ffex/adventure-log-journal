import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptionUploadPageComponent } from './transcription-upload-page.component';

describe('TranscriptionUploadPageComponent', () => {
  let component: TranscriptionUploadPageComponent;
  let fixture: ComponentFixture<TranscriptionUploadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranscriptionUploadPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranscriptionUploadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
