import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDemoComponent } from './my-demo.component';

describe('MyDemoComponent', () => {
  let component: MyDemoComponent;
  let fixture: ComponentFixture<MyDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MyDemoComponent]
    });
    fixture = TestBed.createComponent(MyDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
