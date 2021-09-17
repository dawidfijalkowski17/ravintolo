import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBox } from './search-box-recipe.component';

describe('FilterNameRecipeComponent', () => {
  let component: SearchBox;
  let fixture: ComponentFixture<SearchBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBox]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
