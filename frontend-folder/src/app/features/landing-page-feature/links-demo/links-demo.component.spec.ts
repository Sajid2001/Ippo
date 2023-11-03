import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksDemoComponent } from './links-demo.component';

describe('LinksDemoComponent', () => {
  let component: LinksDemoComponent;
  let fixture: ComponentFixture<LinksDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinksDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
