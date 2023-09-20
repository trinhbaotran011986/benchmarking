import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddQuestionComponent } from './modal-add-question.component';

describe('ModalAddQuestionComponent', () => {
  let component: ModalAddQuestionComponent;
  let fixture: ComponentFixture<ModalAddQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAddQuestionComponent]
    });
    fixture = TestBed.createComponent(ModalAddQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
