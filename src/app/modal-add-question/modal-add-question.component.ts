import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionParagraph } from '../models/question-paragraph.model';

@Component({
  selector: 'app-modal-add-question',
  templateUrl: './modal-add-question.component.html',
  styleUrls: ['./modal-add-question.component.css'],
})
export class ModalAddQuestionComponent {
  @Output('onClose') onCloseHandler = new EventEmitter<void>();
  @Output('onOK') onOkHandle = new EventEmitter<QuestionParagraph>();
  @Input() isVisible: boolean = false;

  typeQuestion = 'paragraph';
  isShowOther = false;
  isDisableOther = false;
  isRequiredControll = false;
 

  handleCancel() {
    this.onCloseHandler.emit();
  }
  handleOk() {
    this.submitForm();
   
  }
  onChangeTypeQuestion(value: string): void {
    this.typeQuestion = value;
  }
  validateForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      typeQuestion: ['', [Validators.required]],
      contentParaph: [''],
      question: [''],
      answer02: [''],
      answer01: [''],
      required: [false],
      other: [''],
      disableOther: [false],
    });
    this.validateForm.setValue({
      typeQuestion: this.typeQuestion,
      contentParaph: '',
      question: '',
      answer02: '',
      answer01: '',
      required: false,
      other: '',
      disableOther: false,
    });
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      const values = this.validateForm.value;
      this.onOkHandle.emit({
        ...values
      });
      
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  onCreatOther(e: any) {
    this.isShowOther = true;
  }
  requiredChange(required: boolean) {
    this.isRequiredControll = required;
    if (!this.isRequiredControll) {
      this.validateForm.controls['question'].clearValidators();
      this.validateForm.controls['question'].markAsPristine();
      if (this.typeQuestion === 'paragraph') {
        this.validateForm.controls['contentParaph'].clearValidators();
        this.validateForm.controls['contentParaph'].markAsPristine();
      } else {
        this.validateForm.controls['answer02'].clearValidators();
        this.validateForm.controls['answer02'].markAsPristine();

        this.validateForm.controls['answer01'].clearValidators();
        this.validateForm.controls['answer01'].markAsPristine();
      }

      if (this.isDisableOther) {
        this.validateForm.controls['other'].clearValidators();
        this.validateForm.controls['other'].markAsPristine();
      }
    } else {
      this.validateForm.controls['question'].setValidators(Validators.required);
      if (this.typeQuestion === 'paragraph') {
        this.validateForm.controls['contentParaph'].setValidators(
          Validators.required
        );
        this.validateForm.controls['contentParaph'].markAsDirty();
      } else {
        this.validateForm.controls['question'].markAsDirty();

        this.validateForm.controls['answer02'].setValidators(
          Validators.required
        );
        this.validateForm.controls['answer02'].markAsDirty();

        this.validateForm.controls['answer01'].setValidators(
          Validators.required
        );
        this.validateForm.controls['answer01'].markAsDirty();
      }

      if (this.isDisableOther) {
        this.validateForm.controls['other'].setValidators(Validators.required);
        this.validateForm.controls['other'].markAsDirty();
      }
    }
    if (this.typeQuestion === 'paragraph') {
      this.validateForm.controls['contentParaph'].updateValueAndValidity();
    } else {
      this.validateForm.controls['answer02'].updateValueAndValidity();

      this.validateForm.controls['answer01'].updateValueAndValidity();
    }

    this.validateForm.controls['question'].updateValueAndValidity();

    if (this.isDisableOther) {
      this.validateForm.controls['other'].updateValueAndValidity();
    }
  }

  requiredDisable(required: boolean) {
    this.isDisableOther = required;
    if (!required) {
      this.isShowOther = false;
    } else {
      if (!this.isRequiredControll) {
        this.validateForm.controls['other'].clearValidators();
        this.validateForm.controls['other'].markAsPristine();
      } else {
        this.validateForm.controls['other'].setValidators(Validators.required);
        this.validateForm.controls['other'].markAsDirty();
        this.validateForm.controls['other'].updateValueAndValidity();
      }
    }
  }
}
