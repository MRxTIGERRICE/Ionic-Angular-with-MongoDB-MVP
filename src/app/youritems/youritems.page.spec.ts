import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YouritemsPage } from './youritems.page';

describe('YouritemsPage', () => {
  let component: YouritemsPage;
  let fixture: ComponentFixture<YouritemsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(YouritemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
