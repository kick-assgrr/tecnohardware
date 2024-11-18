import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElegirMetodoPage } from './elegir-metodo.page';

describe('ElegirMetodoPage', () => {
  let component: ElegirMetodoPage;
  let fixture: ComponentFixture<ElegirMetodoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ElegirMetodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
