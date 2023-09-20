import { Injectable } from "@angular/core";
import { Actions, createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import * as questionActions from '../actions/form.action';
import { catchError, map,  mergeMap,  switchMap, throwError } from "rxjs";

@Injectable()
export class QuestionEffects {
    constructor(private actions$: Actions ) {} 
}