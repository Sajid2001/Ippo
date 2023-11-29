import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDemoComponent } from './search-demo.component';

describe('SearchDemoComponent', () => {
  let component: SearchDemoComponent;
  let fixture: ComponentFixture<SearchDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
