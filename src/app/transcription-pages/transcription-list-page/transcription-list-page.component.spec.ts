import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptionListPageComponent } from './transcription-list-page.component';

describe('TranscriptionListPageComponent', () => {
  let component: TranscriptionListPageComponent;
  let fixture: ComponentFixture<TranscriptionListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranscriptionListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranscriptionListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
