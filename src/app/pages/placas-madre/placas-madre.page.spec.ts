import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlacasMadrePage } from './placas-madre.page';

describe('PlacasMadrePage', () => {
  let component: PlacasMadrePage;
  let fixture: ComponentFixture<PlacasMadrePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacasMadrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
