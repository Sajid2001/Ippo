import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookmarkFormComponent } from './edit-bookmark-form.component';

describe('EditBookmarkFormComponent', () => {
  let component: EditBookmarkFormComponent;
  let fixture: ComponentFixture<EditBookmarkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBookmarkFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookmarkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
