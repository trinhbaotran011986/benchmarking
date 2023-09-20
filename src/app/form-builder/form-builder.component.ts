import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../stores/reducers/app.reducer'
import { QuestionParagraph } from '../models/question-paragraph.model';
import * as QuestionActions from "../stores/actions/form.action";
import { Subscription } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.storeSub.unsubscribe()
  }
  ngOnInit(): void {
    this.storeSub =  this.store.select('paragraphs').subscribe(appState => {
      let arrayOrg = this.questionArray;
     
      appState.paragraphs.forEach(function (value) {
        let arrayAnswers = [{
          label: value.contentParaph,
          value:  new Date().toISOString(),
        }]
        if (value.other !== '')
        {
          arrayAnswers.push({
            label: value.other,
            value:  new Date().toISOString(),
          })
        }
        arrayOrg.push({
          question: value.question,
          answers: arrayAnswers

        })
      });

      appState.checkboxList.forEach(function (value) {
       
        let arrayCheckBox = [
          ...[{
            label: value.answer01,
            value:  new Date().toISOString(),
          }],
          ...[{
            label: value.answer02,
            value:  new Date().toISOString(),
          }]

        ]
        if (value.other !== '')
        {
          arrayCheckBox.push({
            label: value.other,
            value:  new Date().toISOString(),
          })
        }
        arrayOrg.push({
          question: value.question,
          answers: arrayCheckBox

        })
      });
      
    })
    
  }
  storeSub: Subscription = new Subscription();
  isSubmit = false;
  isVisible = false;
  questionClient: string = ''
  questionArray = [
   {
    question: 'Please select the languages you know',
    answers: [
      { label: 'Typescript', value: 'Typescript'},
      { label: 'Python', value: 'Python' },
      { label: 'C#', value: 'C#' },
      { label: 'Other', value: 'Other' }
    ]
   }
  ];
  validateForm: FormGroup;
  chooseAnsers : QuestionActions.answer [] = []
  constructor(private fb: FormBuilder,  private store: Store<fromApp.AppState>, private notification: NzNotificationService, private route: ActivatedRoute, private router: Router) {
    
    this.validateForm = this.fb.group({
      introduce: ['', [Validators.required]],
      checkArray: this.fb.array([], [Validators.required]),
    });
  }
  submitForm(): void {
    this.isSubmit = !this.isSubmit
    if (this.validateForm.valid) {
      const values = this.validateForm.value;
     
      this.store.dispatch(new QuestionActions.chooseAnswers({
        introdue: values.introduce,
        answers: this.chooseAnsers,
        question: this.questionClient
       
      }))
      this.router.navigate(['form/answers']);
     
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  onCheckboxChange(e: any, item: any, questionTmp: any) {
    this.questionClient = questionTmp.question;
    const checkArray: FormArray = this.validateForm.get('checkArray') as FormArray;
    if (e.target.checked) {
     
      checkArray.push(new FormControl(e.target.value));
      this.chooseAnsers.push({
        value: item.value,
        label: item.label
      })
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          let idx = this.chooseAnsers.findIndex(itm=> item.value == itm.value)
          this.chooseAnsers.splice(idx, 1)
          return;
        }
        i++;
      });
    }
  }
  onOpenQuestion (e: any) {
    this.isVisible = true
  }
  onClose (e: any) {
    this.isVisible = false
  }
  onOK (e: any) {
   
    if (e.typeQuestion === 'paragraph')
    {
      if (e.contentParaph === ''  ||  e.question === '') {
        this.notification.create(
          'error',
          'Notification Error',
          'Please check into checkbox require'
        );
      }
      else {
        this.store.dispatch(new QuestionActions.fetchParagraph({
          contentParaph: e.contentParaph,
          question: e.question,
          other: e.other
        }))
      }
    }
    else {
      if (e.answer01 === '' || e.answer02 === '' || e.question === '' ) {
        this.notification.create(
          'error',
          'Notification Error',
          'Please check into checkbox require'
        );
      }
      else {
        this.store.dispatch(new QuestionActions.fetchCheckbox({
          question: e.question,
          answer02: e.answer01,
          answer01: e.answer02,
          other: e.other
        }))
      }
    }
   
  }
}
