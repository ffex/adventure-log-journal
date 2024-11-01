import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureJournalPageComponent } from './adventure-journal-page.component';

describe('AdventureJournalPageComponent', () => {
  let component: AdventureJournalPageComponent;
  let fixture: ComponentFixture<AdventureJournalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdventureJournalPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdventureJournalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
