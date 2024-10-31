import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureManagerPageComponent } from './adventure-manager-page.component';

describe('AdventureManagerPageComponent', () => {
  let component: AdventureManagerPageComponent;
  let fixture: ComponentFixture<AdventureManagerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdventureManagerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdventureManagerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
