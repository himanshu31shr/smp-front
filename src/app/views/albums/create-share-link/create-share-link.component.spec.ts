import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShareLinkComponent } from './create-share-link.component';

describe('CreateShareLinkComponent', () => {
  let component: CreateShareLinkComponent;
  let fixture: ComponentFixture<CreateShareLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateShareLinkComponent]
    });
    fixture = TestBed.createComponent(CreateShareLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
