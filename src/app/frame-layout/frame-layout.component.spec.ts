import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameLayoutComponent } from './frame-layout.component';

describe('FrameLayoutComponent', () => {
  let component: FrameLayoutComponent;
  let fixture: ComponentFixture<FrameLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrameLayoutComponent]
    });
    fixture = TestBed.createComponent(FrameLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
