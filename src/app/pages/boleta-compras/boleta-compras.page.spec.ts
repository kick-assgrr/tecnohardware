import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoletaComprasPage } from './boleta-compras.page';

describe('BoletaComprasPage', () => {
  let component: BoletaComprasPage;
  let fixture: ComponentFixture<BoletaComprasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletaComprasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
