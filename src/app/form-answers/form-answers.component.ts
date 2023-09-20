import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../stores/reducers/app.reducer'
import { answer, answersQuestion } from '../stores/actions/form.action';


@Component({
  selector: 'app-form-answers',
  templateUrl: './form-answers.component.html',
  styleUrls: ['./form-answers.component.css']
})
export class FormAnswersComponent implements OnInit, OnDestroy {
  storeSub: Subscription = new Subscription();
  questionArray: answersQuestion [] = [];
  ngOnDestroy(): void {
    this.storeSub.unsubscribe
   
  }
  constructor(  private store: Store<fromApp.AppState>, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit(): void {
    this.storeSub =  this.store.select('paragraphs').subscribe(appState => {
      appState.answers.forEach((item: answersQuestion) => {
        this.questionArray.push({
          question: item.question,
          answers: item.answers,
          introdue: item.introdue
        })
      })
    })
    
  }
  onGoHome (e : any) {
    this.router.navigate(['form/builder']);
  }
 
}
