import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamLinksComponent } from './stream-links.component';

describe('StreamLinksComponent', () => {
  let component: StreamLinksComponent;
  let fixture: ComponentFixture<StreamLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
