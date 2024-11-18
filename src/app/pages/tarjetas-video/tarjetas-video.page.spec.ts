import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarjetasVideoPage } from './tarjetas-video.page';

describe('TarjetasVideoPage', () => {
  let component: TarjetasVideoPage;
  let fixture: ComponentFixture<TarjetasVideoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetasVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
