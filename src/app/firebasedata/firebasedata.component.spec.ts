import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebasedataComponent } from './firebasedata.component';

describe('FirebasedataComponent', () => {
  let component: FirebasedataComponent;
  let fixture: ComponentFixture<FirebasedataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirebasedataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebasedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
