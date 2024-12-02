import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptionDetailPageComponent } from './transcription-detail-page.component';

describe('TranscriptionDetailPageComponent', () => {
  let component: TranscriptionDetailPageComponent;
  let fixture: ComponentFixture<TranscriptionDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranscriptionDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranscriptionDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
