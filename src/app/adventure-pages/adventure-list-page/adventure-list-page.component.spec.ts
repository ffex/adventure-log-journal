import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureListPageComponent } from './adventure-list-page.component';

describe('AdventureListPageComponent', () => {
  let component: AdventureListPageComponent;
  let fixture: ComponentFixture<AdventureListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdventureListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdventureListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
