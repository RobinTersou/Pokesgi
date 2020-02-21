import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSelectComponent } from './pokemon-select.component';

describe('PokemonSelectComponent', () => {
  let component: PokemonSelectComponent;
  let fixture: ComponentFixture<PokemonSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
