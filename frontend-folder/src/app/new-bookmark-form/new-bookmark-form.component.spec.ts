import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBookmarkFormComponent } from './new-bookmark-form.component';

describe('NewBookmarkFormComponent', () => {
  let component: NewBookmarkFormComponent;
  let fixture: ComponentFixture<NewBookmarkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBookmarkFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBookmarkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
