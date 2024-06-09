import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CivisHeroesComponent } from './civis-heroes.component';

describe('CivisHeroesComponent', () => {
  let component: CivisHeroesComponent;
  let fixture: ComponentFixture<CivisHeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CivisHeroesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CivisHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
