import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CustomerDetail } from './customer-detail';

describe('CustomerDetail', () => {
  let component: CustomerDetail;
  let fixture: ComponentFixture<CustomerDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDetail],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
