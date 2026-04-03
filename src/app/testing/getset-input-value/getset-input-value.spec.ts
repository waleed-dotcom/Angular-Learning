import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetsetInputValue } from './getset-input-value';

describe('GetsetInputValue', () => {
  let component: GetsetInputValue;
  let fixture: ComponentFixture<GetsetInputValue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetsetInputValue],
    }).compileComponents();

    fixture = TestBed.createComponent(GetsetInputValue);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
