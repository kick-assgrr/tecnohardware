import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RegistPage } from './regist.page';

describe('RegistPage', () => {
  let component: RegistPage;
  let fixture: ComponentFixture<RegistPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
