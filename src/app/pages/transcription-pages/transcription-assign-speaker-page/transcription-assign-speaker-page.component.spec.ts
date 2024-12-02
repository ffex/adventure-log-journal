import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptionAssignSpeakerPageComponent } from './transcription-assign-speaker-page.component';

describe('TranscriptionAssignSpeakerPageComponent', () => {
  let component: TranscriptionAssignSpeakerPageComponent;
  let fixture: ComponentFixture<TranscriptionAssignSpeakerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranscriptionAssignSpeakerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranscriptionAssignSpeakerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
