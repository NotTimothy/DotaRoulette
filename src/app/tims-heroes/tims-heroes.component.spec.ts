import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimsHeroesComponent } from './tims-heroes.component';

describe('TimsHeroesComponent', () => {
  let component: TimsHeroesComponent;
  let fixture: ComponentFixture<TimsHeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimsHeroesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimsHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
